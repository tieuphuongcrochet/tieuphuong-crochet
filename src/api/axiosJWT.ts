import axios, { AxiosError } from "axios";
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { jwtDecode } from "jwt-decode";
import axiosClient from "./axiosClient";
import { API_URL, COOKIE_NAMES, getCookie, notification } from "utils";
import { ErrorData, RefreshTokenRes } from "models";

const refreshToken = async () => {
    console.log('refreshe token', getCookie(COOKIE_NAMES.REFRESHER_TOKEN));
    let refreshData: RefreshTokenRes = {
        jwtToken: '',
        refreshToken: ''
    };

    try {
        refreshData = await axiosClient.post(`${API_URL.REFRESH_TOKEN}?refreshToken=${getCookie(COOKIE_NAMES.REFRESHER_TOKEN)}`);
        console.log('resfresh api', refreshData);
        return refreshData;
    } catch (err) {
        console.log(err);
        return refreshData
    }
};

const axiosJWT = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});

// Add a request interceptor
axiosJWT.interceptors.request.use(async function (config: InternalAxiosRequestConfig) {
    // Do something before request is sent
    console.log('axios JWT', config);
    const accessToken = getCookie(COOKIE_NAMES.ACCESS_TOKEN);
    console.log('accessToken', accessToken);

    if (accessToken) {
        const tokenInfo = jwtDecode(accessToken);
        console.log('tokenInfo', tokenInfo);

        let date = new Date();
        if (tokenInfo.exp && tokenInfo.exp < date.getTime() / 1000) {
            console.log('run reshehj');

            const data = await refreshToken();
            console.log('rfresh', data);

            config.headers.Authorization = `Bearer ${data.jwtToken}`;
            return config;
        }
        config.headers.Authorization = `Bearer ${getCookie(COOKIE_NAMES.ACCESS_TOKEN)}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosJWT.interceptors.response.use(function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error	
    const { response } = error
    const message = (response?.data as ErrorData).message;
    notification.error({message: 'Failed', description: message})
    return Promise.reject(error);
});

export default axiosJWT;

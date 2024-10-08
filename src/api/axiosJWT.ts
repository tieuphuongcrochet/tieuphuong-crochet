import axios, { AxiosError } from "axios";
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { jwtDecode } from "jwt-decode";
import axiosClient from "./axiosClient";
import { API_URL, COOKIE_NAMES, getBaseUrl, getCookie, notification, setCookie } from "utils";
import { ErrorData, RefreshTokenRes } from "models";

const refreshToken = async () => {
    let refreshData: RefreshTokenRes = {
        jwtToken: '',
        refreshToken: ''
    };

    try {
        refreshData = await axiosClient.post(`${API_URL.REFRESH_TOKEN}?refreshToken=${getCookie(COOKIE_NAMES.REFRESHER_TOKEN)}`);
        return refreshData;
    } catch (err) {
        return refreshData
    }
};

const axiosJWT = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});

// Add a request interceptor
axiosJWT.interceptors.request.use(async function (config: InternalAxiosRequestConfig) {
    // Do something before request is sent
    const accessToken = getCookie(COOKIE_NAMES.ACCESS_TOKEN);
    if (accessToken) {
        const tokenInfo = jwtDecode(accessToken);        let date = new Date();
        if (tokenInfo.exp && tokenInfo.exp < date.getTime() / 1000) {
            const data = await refreshToken();
            // config.headers.Authorization = `Bearer ${data.jwtToken}`;
            setCookie(COOKIE_NAMES.ACCESS_TOKEN,data.jwtToken, 1 );
            setCookie(COOKIE_NAMES.REFRESHER_TOKEN, data.refreshToken, 1);
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

import axios, { AxiosError } from "axios";
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axiosClient from "./axiosClient";
import { API_URL, COOKIE_NAMES, getCookie } from "utils";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authActions } from "pages/login/authSlice";

const refreshToken = async () => {
    console.log('refreshe token', getCookie(COOKIE_NAMES.REFRESHER_TOKEN));
    
    try {
        const res = await axiosClient.post(`${API_URL.REFRESH_TOKEN}?refreshToken=${getCookie(COOKIE_NAMES.REFRESHER_TOKEN)}`);
        return res.data;
    } catch (err) {
        console.log(err);
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
            
            config.headers.Authorization = `Bearer ${data.refreshToken}`;
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
    return Promise.reject(error);
});

export default axiosJWT;

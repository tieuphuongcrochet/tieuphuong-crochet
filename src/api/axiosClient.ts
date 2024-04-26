import axios, { AxiosError } from "axios";
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ErrorData } from "models";
import { notification } from "utils";

const axiosClient = axios.create({
	baseURL: 'http://localhost:8080',
	headers: {
		'Content-Type': 'application/json;charset=UTF-8'
	}
});

// Add a request interceptor
axiosClient.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
	// Do something before request is sent
	return config;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response: AxiosResponse) {
	// Any status code that lie within the range of 2xx cause this function to trigger
	// Do something with response data
	return response.data;
}, function (error: AxiosError) {
	// Any status codes that falls outside the range of 2xx cause this function to trigger
	// Do something with response error	
	const { response } = error
	const message = (response?.data as ErrorData).message;
	notification.error({message: 'Failed', description: message})
	return Promise.reject(error.response?.data);
});

export default axiosClient;

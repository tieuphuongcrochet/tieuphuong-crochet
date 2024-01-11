import { API_URL } from "utils";
import axiosClient from "./axiosClient";
import {LoginParams} from 'models';

const userApi = {
	login(params: LoginParams): Promise<any> {		
		return axiosClient.post(API_URL.LOGIN, params)
	},

	registerAccount(params: any): Promise<any> {
		return axiosClient.post(API_URL.SIGNUP, { params });
	},
}

export default userApi;
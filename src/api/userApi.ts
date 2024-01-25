import { User } from 'models';
import { API_URL } from "utils";
import axiosClient from "./axiosClient";

const userApi = {
	login(params: User): Promise<any> {		
		return axiosClient.post(API_URL.LOGIN, params)
	},

	registerAccount(params: User): Promise<any> {
		return axiosClient.post(API_URL.SIGNUP, params);
	},
}

export default userApi;
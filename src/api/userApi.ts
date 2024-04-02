import { DataType, ListParams, User } from 'models';
import { API_URL } from "utils";
import axiosClient from "./axiosClient";
import axiosJWT from './axiosJWT';

const userService = {
	login(params: User): Promise<any> {
		return axiosClient.post(API_URL.LOGIN, params)
	},

	registerAccount(params: User): Promise<any> {
		return axiosClient.post(API_URL.SIGNUP, params);
	},

	getAllUser(params: ListParams): Promise<DataType> {
		const { _pageNo, _pageSize, _sortBy, _sortDir, searchText, filters } = params;
		const url = `${API_URL.USER}/${API_URL.PAGINATION}?pageNo=${_pageNo}&pageSize=${_pageSize}&sortBy=${_sortBy}&sortDir=${_sortDir}&searchText=${searchText}`;
		return axiosJWT.post(url, filters);
	}
}

export default userService;
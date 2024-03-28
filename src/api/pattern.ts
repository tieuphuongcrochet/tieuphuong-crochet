import { DataType, ListParams } from 'models';
import axiosClient from "./axiosClient";
import { API_URL } from 'utils';
import axiosJWT from './axiosJWT';
import { Pattern } from "models";

const patternService = {
	getAll(params: ListParams): Promise<DataType> {		
		const {_pageNo, _pageSize, _sortBy, _sortDir, text, categoryIds} = params;
		const url = `${API_URL.FREE_PATTERN}/${API_URL.PAGINATION}?pageNo=${_pageNo}&pageSize=${_pageSize}&sortBy=${_sortBy}&sortDir=${_sortDir}&text=${text}&categoryIds=${categoryIds}`;
		return axiosClient.get(url);
	},
    add(data: Pattern): Promise<DataType> {
        const url = `${API_URL.FREE_PATTERN}/${API_URL.CREATE}`
		return axiosJWT.post(url, data);
	},

	getById(id: string): Promise<DataType> {
        const url = `${API_URL.FREE_PATTERN}/${API_URL.DETAIL}?id=${id}`
		return axiosClient.get(url);
	},

	// getById(id: string): Promise<DataType> {
	// 	const url = `${API_URL.PRODUCT}/detail/${id}`;
	// 	return axiosClient.get(url);
	// },

	// remove(id: string): Promise<any> {
	// 	const url = `${API_URL.PRODUCT}/${id}`;
	// 	return axiosClient.delete(url);
	// }
}

export default patternService;

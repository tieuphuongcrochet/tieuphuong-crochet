import { DataType, ListParams } from 'models';
import axiosClient from "./axiosClient";
import { API_URL } from 'utils';
import axiosJWT from './axiosJWT';
import { Pattern } from "models";

const patternService = {
	add(data: Pattern): Promise<DataType> {
        const url = `${API_URL.FREE_PATTERN}/${API_URL.CREATE}`
		return axiosJWT.post(url, data);
	},
	
	getAll(params: ListParams): Promise<DataType> {
		const {_pageNo, _pageSize, _sortBy, _sortDir, filters} = params;
		const url = `${API_URL.FREE_PATTERN}/${API_URL.PAGINATION}?pageNo=${_pageNo}&pageSize=${_pageSize}&sortBy=${_sortBy}&sortDir=${_sortDir}`;
		return axiosClient.post(url, filters);
	},

	getById(id: string): Promise<DataType> {
        const url = `${API_URL.FREE_PATTERN}/${API_URL.DETAIL}?id=${id}`
		return axiosClient.get(url);
	},

	getSavedPatterns(params: ListParams): Promise<DataType> {
        const {_pageNo, _pageSize, _sortBy, _sortDir, filters} = params;
        const url = `${API_URL.FREE_PATTERN}/saved?pageNo=${_pageNo}&pageSize=${_pageSize}&sortBy=${_sortBy}&sortDir=${_sortDir}`;
        return axiosClient.post(url, filters);
    },

	remove(id: React.Key): Promise<any> {
		const url = `${API_URL.FREE_PATTERN}/${API_URL.DELETE}?id=${id}`;
		return axiosJWT.delete(url);
	}
}

export default patternService;

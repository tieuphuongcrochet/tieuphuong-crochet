import { DataType, ListParams } from 'models';
import axiosClient from "./axiosClient";
import { API_URL } from 'utils';
import axiosJWT from './axiosJWT';
import { Post } from 'models/post';

const postService = {
	getAll(params: ListParams): Promise<DataType> {
		const {_pageNo, _pageSize, _sortBy, _sortDir, searchText} = params;
		const url = `${API_URL.BLOG}/${API_URL.PAGINATION}?pageNo=${_pageNo}&pageSize=${_pageSize}&sortBy=${_sortBy}&sortDir=${_sortDir}&searchText=${searchText}`;
		return axiosClient.get(url);
	},
	add(data: Post): Promise<DataType> {
        const url = `${API_URL.BLOG}/${API_URL.CREATE}`
		return axiosJWT.post(url, data);
	},

	// update(data: DataType): Promise<DataType> {
  //       const url = `${API_URL.PRODUCT_CATEGORY}/${API_URL.CREATE}`
	// 	return axiosJWT.post(url, { data });
	// },

	// getById(id: string): Promise<DataType> {
	// 	const url = `${API_URL.PRODUCT}/detail/${id}`;
	// 	return axiosClient.get(url);
	// },

	// remove(id: string): Promise<any> {
	// 	const url = `${API_URL.PRODUCT}/${id}`;
	// 	return axiosClient.delete(url);
	// }
}

export default postService;

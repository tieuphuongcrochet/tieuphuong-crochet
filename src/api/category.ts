import { DataType, Category } from 'models';
import axiosClient from "./axiosClient";
import { API_URL } from 'utils';
import axiosJWT from './axiosJWT';

const category = {
	getAll(): Promise<DataType> {
		const url = API_URL.ALL_CATEGORY;
		return axiosClient.get(url);
	},

	add(data: Category): Promise<any> {
		const url = `${API_URL.CATEGORY}/${API_URL.CREATE}`
		return axiosJWT.post(url, data);
	},

	update(data: Category): Promise<any> {
		const url = `${API_URL.CATEGORY}/${API_URL.UPDATE}`
		return axiosJWT.put(url, data);
	},

	// getById(id: string): Promise<DataType> {
	// 	const url = `${API_URL.PRODUCT}/detail/${id}`;
	// 	return axiosClient.get(url);
	// },

	remove(id: React.Key): Promise<any> {
		const url = `${API_URL.CATEGORY}/${API_URL.DELETE}?id=${id}`;
		return axiosJWT.delete(url);
	}
}

export default category;

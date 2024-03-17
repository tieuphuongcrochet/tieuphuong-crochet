import { DataType } from 'models';
import axiosClient from "./axiosClient";
import { API_URL } from 'utils';
import axiosJWT from './axiosJWT';

const product = {
	getAll(): Promise<DataType> {
		const url = `${API_URL.FREE_PATTERN}`;
		return axiosClient.get(url);
	},
  //   add(data: DataType): Promise<DataType> {
  //       const url = `${API_URL.PRODUCT_CATEGORY}/${API_URL.CREATE}`
	// 	return axiosJWT.post(url, data);
	// },

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

export default product;

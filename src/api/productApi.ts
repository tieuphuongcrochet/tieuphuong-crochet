import { ListParams, ListResponse, Product } from "../models";
import { API_URL } from "../utils/constant";
import axiosClient from "./axiosClient";

const productApi = {
	getAll(params: ListParams): Promise<ListResponse<Product>> {
		return axiosClient.get(API_URL.PRODUCT, { params });
	},

	add(data: Product): Promise<Product> {
		return axiosClient.post(API_URL.PRODUCT, { data });
	},

	update(data: Product): Promise<Product> {
		return axiosClient.patch(API_URL.PRODUCT, { data });
	},

	getById(id: string): Promise<Product> {
		const url = `${API_URL.PRODUCT}/detail/${id}`;
		return axiosClient.get(url);
	},

	remove(id: string): Promise<any> {
		const url = `${API_URL.PRODUCT}/${id}`;
		return axiosClient.delete(url);
	}
}

export default productApi;

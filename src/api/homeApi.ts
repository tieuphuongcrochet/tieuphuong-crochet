import { HomeData } from "../models";
import axiosClient from "./axiosClient";

const homeApi = {
	getAll(): Promise<HomeData> {
		const url = '/home';
		return axiosClient.get(url);
	}
}

export default homeApi;

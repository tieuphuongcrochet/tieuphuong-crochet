import { DataType } from 'models';
import { API_URL } from 'utils';
import { Banner, IBannerType } from 'models/setting';
import axiosJWT from './axiosJWT';

const setting = {
	getBannerTypes(): Promise<DataType> {
		const url = API_URL.BANNER_TYPE;
		return axiosJWT.get(url);
	},

	cUBannerType(data: IBannerType): Promise<any> {
		const url = API_URL.CU_BANNER_TYPE;
		return axiosJWT.post(url, data);
	},

	removeBType(id: React.Key): Promise<any> {
		const url = `${API_URL.D_BANNER_TYPE}/${id}`;
		return axiosJWT.delete(url);
	},

	getAllBanners(): Promise<DataType> {
		const url = API_URL.GETT_ALL_BANNER;
		return axiosJWT.get(url);
	},

	cUBanners(data: Banner[]): Promise<any> {
		const url = API_URL.CU_BANNER;
		return axiosJWT.post(url, data);
	},
}

export default setting;

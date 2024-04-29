import { DataType } from "./table";

export interface Banner {
	fileContent: string;
	fileName: string;
	title?: string;
	content?: string;
	url?: string;
	bannerTypeId: string;
	active?: boolean;
	id?: string;
	bannerType?: IBannerType;
};

export type TBannerType = 'Shop' | 'About' | 'Pattern' | 'Product' | 'Free pattern' | 'Contact' | 'Home' | 'Blog' | 'Advertisement' | '';

export interface IBannerType {
	id?: React.Key;
	name: TBannerType;
	createdDate?: string;
}

export interface SettingState {
	loading: {
		banner: boolean,
		bannerType: boolean
	};
	bannerTypes: DataType[];
	banners: Banner[];
}

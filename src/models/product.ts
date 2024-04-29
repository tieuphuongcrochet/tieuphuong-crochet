import { Category } from "./category";
import { FileUpload } from "./common";
import { Pattern } from "./pattern";
import { Banner } from "./setting";
import { DataType } from "./table";

export interface Product {
	id?: React.Key,
	name: string,
	price?: number,
	description?: string,
	images?: FileUpload[];
	src?: string;
	author?: string;
	currency_code?: string;
	category?: Category;
	imagesPreview?: { src: string, alt: string }[];
	link?: string;
}

export interface ProductPayloadFile {
	file: any;
	resolve?: any
}

export interface HomeData {
	products: Product[],
	patterns: Pattern[],
	freePatterns: Pattern[],
	banners: Banner[]
};

export interface ProductState {
	loading: boolean;
	data: DataType[];
	totalRecord: number;
	product: Product;
}

export interface ProductPayload {
	params: Product;
	callback: Function;
}
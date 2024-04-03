import { Category } from "./category";
import { FileUpload } from "./common";
import { Pattern } from "./pattern";
import { DataType } from "./table";

export interface Product {
	id?: string,
	name: string,
	price?: number,
	description?: string,
	images?: FileUpload[];
	src?: string;
	author?: string;
	currency_code?: string;
	category: Category;
	imagesPreview?: { src: string, alt: string }[]
}

export interface ProductPayloadFile {
	file: any;
	resolve?: any
}

export interface HomeData {
	products: Product[],
	patterns: Pattern[],
	freePatterns: Pattern[]
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
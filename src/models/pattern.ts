import { Category } from "./category";
import { FileUpload } from "./common";
import { DataType } from "./table";

export interface Pattern {
	id?: React.Key;
	name: string;
	price?: number;
	description?: string;
	files?: FileUpload[];
	author?: string;
	src?: string;
	images?: FileUpload[];
	category?: Category;
	imagesPreview?: { src: string, alt: string }[];
	link?: string;
	currency_code?: string;
	content?: string;
	status?: string;
}

export interface PayloadFile {
	file: any;
	resolve?: any
}

export interface PatternPayload {
	params: Pattern;
	callback: Function
};

export interface PatternState {
	loading: boolean;
	data: DataType[];
	totalRecord: number;
	pattern: Pattern;
}

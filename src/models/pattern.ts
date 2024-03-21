import { Category } from "./category";
import { FileUpload } from "./common";
import { DataType } from "./table";

export interface Pattern {
	id?: string;
	name: string;
	price?: number;
	description?: string;
	files?: FileUpload[];
	author?: string;
	src?: string;
	images?: FileUpload[];
	category?: Category
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

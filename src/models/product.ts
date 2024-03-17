import { Pattern } from "./pattern";

export interface Product {
	id: string,
	name: string,
	price?: number,
	description?: string,
	files?: string[];
	src?: string;
	author?: string;
}

export interface HomeData {
	products: Product[],
	patterns: Pattern[],
	freePatterns: Pattern[]
};

import { Pattern } from "./pattern";

export interface Product {
	id: string,
	name: string,
	price?: number,
	description?: string,
	bytes?: string[];
	src?: string;
}

export interface HomeData {
	products: Product[],
	patterns: Pattern[],
	freePatterns: Pattern[]
};

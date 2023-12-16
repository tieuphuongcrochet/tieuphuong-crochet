import { FreePattern } from "./freePattern";
import { Pattern } from "./pattern";

export interface Product {
	id: string,
	name: string,
	price: number,
	description: string,
	bytes: string[];
}

export interface HomeData {
	products: Product[],
	patterns: Pattern[],
	freePattern: FreePattern[]
};

import { DataType } from "./table";

export interface Category {
    id?: string;
    categoryName: string;
};

export interface CategoryState {
    loading: boolean;
    data: DataType[];
    totalRecord: number;
}

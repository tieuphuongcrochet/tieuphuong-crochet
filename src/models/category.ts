import { DataType } from "./table";

export interface Category {
    id?: string;
    name: string;
    children?: any[];
    parentIds?: any[];
};

export interface CategoryState {
    loading: boolean;
    data: DataType[];
    totalRecord: number;
}

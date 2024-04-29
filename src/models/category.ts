import { DataType } from "./table";

export interface Category {
    id?: React.Key;
    name: string;
    children?: any[];
    parentIds?: any[];
    key?: string;
};

export interface CategoryState {
    loading: boolean;
    data: DataType[];
    totalRecord: number;
}

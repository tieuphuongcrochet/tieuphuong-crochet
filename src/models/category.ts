import { DataType } from "./table";

export interface Category {
    id?: string;
    name: string;
    chilren?: any[];
    parentId?: string;
};

export interface CategoryState {
    loading: boolean;
    data: DataType[];
    totalRecord: number;
}

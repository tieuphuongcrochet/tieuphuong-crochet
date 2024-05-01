import { FileUpload } from "./common";
import { DataType } from "./table";

export interface Post {
    id?: React.Key,
    title: string,
    content: string,
    createdDate: string,
    files?: FileUpload[],
    src?: string,
    is_home?:boolean
}

export interface PostPayloadFile {
    file: any;
    resolve?: any
}

export interface PostState {
    loading: boolean;
    data: DataType[];
    totalRecord: number;
    post: Post;
}

export interface PostPayload {
    params: Post;
    callback: Function;
}
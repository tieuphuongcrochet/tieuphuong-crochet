import { FileUpload } from "./common";
import { DataType } from "./table";

export interface Post {
    id?: string,
    title: string,
    content?: string,
    createdDate?: string,
    files?: FileUpload[],
    src?: string,
    imagesPreview?: { src: string, alt: string }[],
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
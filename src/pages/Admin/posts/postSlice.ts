import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ListParams, ListTablePayload } from "models";
import { Post, PostPayload, PostPayloadFile, PostState } from "models/post";

const initialState: PostState = {
    loading: false,
    data: [],
    totalRecord: 0,
    post: { title: '', content: '' }
};

const postSlice = createSlice({
    name: 'postAdmin',
    initialState,
    reducers: {
        loadingRequest(state) {
            state.loading = true;
        },
        loadingSuccess(state) {
            state.loading = false;
        },
        saveData(state, { payload }: PayloadAction<ListTablePayload<any>>) {
            state.data = payload.data;
            state.totalRecord = payload.total;
        },
        savePost(state, { payload }: PayloadAction<Post>) {
            state.post = payload;
            state.loading = false;
        },
        resetPost(state) {
            state.post = { title: '', content: '' };
        },
        fetchData(_, { payload }: PayloadAction<ListParams>) { },
        cUPost(_, { payload }: PayloadAction<PostPayload>) { },
        delete(_, { payload }: PayloadAction<React.Key>) { },
        uploadFiles(_, { payload }: PayloadAction<PostPayloadFile>) { },
        fetchPost(_, { payload }: PayloadAction<string>) { }
    }
});

export const postAction = postSlice.actions;

// Selectors
export const selectLoading = (state: RootState) => state.post.loading;
export const selectPosts = (state: RootState) => state.post.data;
export const selectTotalRecords = (state: RootState) => state.post.totalRecord;
export const selectPost = (state: RootState) => state.post.post;

// Reducer
const postReducer = postSlice.reducer;
export default postReducer;

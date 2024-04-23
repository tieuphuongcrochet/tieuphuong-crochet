import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ListParams, ListTablePayload, Product, ProductPayload, ProductPayloadFile, ProductState } from "models";

const initialState: ProductState = {
    loading: false,
    data: [],
    totalRecord: 0,
    product: { name: '', category: { name: '' } }
};

const productSlice = createSlice({
    name: 'productAdmin',
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
        saveProduct(state, { payload }: PayloadAction<Product>) {
            state.product = payload;
            state.loading = false;
        },
        resetProduct(state) {
            state.product = { name: '', category: { name: '' } };
        },
        fetchData(_, { payload }: PayloadAction<ListParams>) { },
        cUProduct(_, { payload }: PayloadAction<ProductPayload>) { },
        delete(_, { payload }: PayloadAction<React.Key>) { },
        uploadFiles(_, { payload }: PayloadAction<ProductPayloadFile>) { },
        fetchProduct(_, { payload }: PayloadAction<string>) { },
    }
});

export const productAction = productSlice.actions;

// Selectors
export const selectLoading = (state: RootState) => state.product.loading;
export const selectProducts = (state: RootState) => state.product.data;
export const selectTotalRecords = (state: RootState) => state.product.totalRecord;
export const selectProduct = (state: RootState) => state.product.product;

// Reducer
const productReducer = productSlice.reducer;
export default productReducer;

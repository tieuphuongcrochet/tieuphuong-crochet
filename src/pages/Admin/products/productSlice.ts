import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { CategoryState, DataType } from "models";

const initialState: CategoryState = {
    loading: false,
    data: [],
    totalRecord: 0
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
        saveData(state, { payload }) {
            state.data = payload;
        },
        fetchData(_, { payload }) { },
        cUCategory(_, { payload }: PayloadAction<DataType>) { },
        delete(_, { payload }: PayloadAction<DataType>) { },
    }
});

export const patternAction = productSlice.actions;

// Selectors
export const selectLoading = (state: RootState) => state.pattern.loading;
export const selectCategories = (state: RootState) => state.pattern.data;
export const selectTotalRecords = (state: RootState) => state.pattern.totalRecord;

// Reducer
const productReducer = productSlice.reducer;
export default productReducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Category, CategoryState } from "models";

const initialState: CategoryState = {
    loading: false,
    data: [],
    totalRecord: 0
};

const categorySlice = createSlice({
    name: 'categoryAdmin',
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
        create(_, { payload }: PayloadAction<Category>) { },
        update(_, { payload }: PayloadAction<Category>) { },
        delete(_, { payload }: PayloadAction<React.Key>) { },
    }
});

export const categoryAction = categorySlice.actions;

// Selectors
export const selectLoading = (state: RootState) => state.category.loading;
export const selectCategories = (state: RootState) => state.category.data;
export const selectTotalRecords = (state: RootState) => state.category.totalRecord;

// Reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
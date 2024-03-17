import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { CategoryState, DataType } from "models";

const initialState: CategoryState = {
    loading: false,
    data: [],
    totalRecord: 0
};

const patternSlice = createSlice({
    name: 'patternAdmin',
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

export const patternAction = patternSlice.actions;

// Selectors
export const selectLoading = (state: RootState) => state.pattern.loading;
export const selectCategories = (state: RootState) => state.pattern.data;
export const selectTotalRecords = (state: RootState) => state.pattern.totalRecord;

// Reducer
const patternReducer = patternSlice.reducer;
export default patternReducer;

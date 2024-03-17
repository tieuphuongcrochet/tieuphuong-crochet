import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ListParams, ListTablePayload, Pattern, PatternPayload, PatternState, PayloadFile } from "models";

const initialState: PatternState = {
    loading: false,
    data: [],
    totalRecord: 0,
    pattern: { name: '' }
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
        saveData(state, { payload }: PayloadAction<ListTablePayload<any>>) {
            state.data = payload.data;
            state.totalRecord = payload.total
        },
        savePattern(state, { payload }: PayloadAction<Pattern>) {
            state.pattern = payload;
            state.loading = false;
        },
        resetPattern(state) {
            console.log('reset pattern');
            
            state.pattern = { name: '' };
        },
        fetchData(_, { payload }: PayloadAction<ListParams>) { },
        cUPattern(_, { payload }: PayloadAction<PatternPayload>) { },
        delete(_, { payload }: PayloadAction<string>) { },
        uploadFiles(_, { payload }: PayloadAction<PayloadFile>) { },
        fetchPattern(_, { payload }: PayloadAction<string>) { },

    }
});

export const patternAction = patternSlice.actions;

// Selectors
export const selectLoading = (state: RootState) => state.pattern.loading;
export const selectPatterns = (state: RootState) => state.pattern.data;
export const selectTotalRecords = (state: RootState) => state.pattern.totalRecord;
export const selectPattern = (state: RootState) => state.pattern.pattern;

// Reducer
const patternReducer = patternSlice.reducer;
export default patternReducer;

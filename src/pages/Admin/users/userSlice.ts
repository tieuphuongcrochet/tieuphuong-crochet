import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { AuthPayload, ListParams, ListTablePayload, User, UserState } from 'models';

const initialState: UserState = {
    loading: false,
    data: [],
    totalRecord: 0,
    user: { email: '' },
};

const userSlice = createSlice({
    name: 'userAdmin',
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
        saveUser(state, { payload }: PayloadAction<User>) {
            state.user = payload;
            state.loading = false;
        },
        resetUser(state) {
            state.user = { email: '' };
        },
        fetchData(_, { payload }: PayloadAction<ListParams>) { },
        cUUser(_, { payload }: PayloadAction<AuthPayload>) { },
        delete(_, { payload }: PayloadAction<React.Key>) { },
        fetchUser(_, { payload }: PayloadAction<string>) { },
    },
});

export const userAction = userSlice.actions;

// Selectors
export const selectLoading = (state: RootState) => state.user.loading;
export const selectUsers = (state: RootState) => state.user.data;
export const selectTotalRecords = (state: RootState) => state.user.totalRecord;
export const selectUser = (state: RootState) => state.user.user;

const userReducer = userSlice.reducer;
export default userReducer;
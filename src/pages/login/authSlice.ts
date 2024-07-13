import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthPayload, ErrorData, LoginRes } from "models/user";

export interface AuthState {
	loading?: boolean;
	isLogggedIn: boolean;
	currentUser?: LoginRes;
	error?: ErrorData;
};

const initialState: AuthState = {
	loading: false,
	isLogggedIn: false,
	currentUser: undefined,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loadingRequest(state) {
			state.loading = true;
		},
		loadingSuccess(state){
			state.loading = false;
		},		
		saveCurrentUser(state, action: PayloadAction<LoginRes>) {
			state.isLogggedIn = true;
			state.currentUser = action.payload;
		},
		requestFailed(state, action: PayloadAction<ErrorData>) {
			state.loading = false;
			state.error = action.payload;
		},
		logout(state) {
			state.isLogggedIn = false;
			state.currentUser = undefined;
		},
		login(state, { payload }: PayloadAction<AuthPayload>) {
		},
		resigter(state, { payload }: PayloadAction<AuthPayload>) { },
	}
});


// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLogggedIn;
export const selectIsLogging = (state: any) => state.auth.logging;
//Reducer
const authReducer = authSlice.reducer;
export default authReducer;
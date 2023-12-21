import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user";

export interface LoginPayload {
	username: string;
	password: string;
};

export interface AuthState {
	isLogggedIn: boolean;
	logging?: boolean;
	currentUser?: User
};

const initialState: AuthState = {
	isLogggedIn: false,
	logging: false,
	currentUser: undefined,

}

const authSlice = createSlice({
	name: 'auth',  
	initialState,
	reducers: {
		login(state, action: PayloadAction<LoginPayload>) {
			state.logging = true;
		},

		loginSuccess(state, action: PayloadAction<User>) {
			state.isLogggedIn = true;
			state.logging = false;
			state.currentUser = action.payload;
		},

		loginFailed(state, action: PayloadAction<string>) {
			state.logging = false;
		},

		logout(state) {
			state.isLogggedIn = false;
			state.currentUser = undefined;
		},
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
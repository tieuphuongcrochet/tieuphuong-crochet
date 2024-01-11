import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload, User } from "models/user";

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

		loginSuccess(state) {
			state.isLogggedIn = true;
			state.logging = false;
		},

		saveCurrentUser(state, action: PayloadAction<User>) {
			state.currentUser = action.payload;
		},

		loginFailed(state) {
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
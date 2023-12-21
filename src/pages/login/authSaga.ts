import { PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload, authActions } from "./authSlice";
import { call, delay, fork, put, take } from "redux-saga/effects";
import { redirect, useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../utils/constant";

function* handleLogin(payload: LoginPayload) {
	try {
		yield delay(1000);
		console.log('handle loggin', payload);
		localStorage.setItem('access_token', 'fake_token');

		yield put(authActions.loginSuccess({
			id: 'phuong996',
			name: 'Tiểu Phương',
		}));

		// redirect to admin page
		// yield put(navigate(ROUTE_PATH.ADMIN));
	} catch (error) {
		console.log('error login', error);
		
		// yield put(authActions.loginFailed(error))
	}

}

function* handleLogout() {
	console.log('handle logout');
	localStorage.removeItem('access_token');

	// redirect to login page
	yield put(redirect(ROUTE_PATH.LOGIN));
}

function* watchLoginFlow() {
	// đợi đến khi user dispatch action login
	while (true) {
		const isLogggedIn = Boolean(localStorage.getItem('access_token'));
		if (!isLogggedIn) {
			const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
			console.log('action', action);
			yield fork(handleLogin, action.payload);
		}

		yield take(authActions.logout.type);
		yield call(handleLogout);
	}
}

export function* authSaga() {
	console.log('auth saga');
	yield fork(watchLoginFlow);
}

import { PayloadAction } from "@reduxjs/toolkit";
import { authActions } from "./authSlice";
import { call, delay, fork, put, take, takeEvery, takeLatest } from "redux-saga/effects";
import { redirect } from "react-router-dom";
import { LOCAL_STORAGE_NAMES, ROLES, ROUTE_PATH } from "utils/constant";
import userApi from "api/userApi";
import { LoginPayload, LoginRes, User } from "models";
import { all } from "axios";

function* handleLogin(payload: LoginPayload) {
	try {

		const { params, callback } = payload;
		console.log('login payload', payload);
		const data: LoginRes = {
			email: params.email,
			role: 'ADMIN',
			accessToken: 'accessTOkenasdfdjkdjkfsdjfdskfdjfdfdkjfgfdgfdg',
			tokenType: 'Bear'
		}
		// const data: LoginRes = yield call(userApi.login, params)
		console.log('response loggin', data);
		// localStorage.setItem(LOCAL_STORAGE_NAMES.ACCESS_TOKEN, data.accessToken);
		const currentUser: User = {
			email: params.email,
			role: data.role
		}
		yield put(authActions.loginSuccess());
		yield put(authActions.saveCurrentUser(currentUser));
		// yield all([
		// ])
		callback instanceof Function && callback();

	} catch (error) {
		console.log('error login', error);

		yield put(authActions.loginFailed())
	}

}

function* handleLogout() {
	console.log('handle logout');
	localStorage.removeItem(LOCAL_STORAGE_NAMES.ACCESS_TOKEN);
	// redirect to login page
	yield put(redirect(ROUTE_PATH.LOGIN));
}

function* watchLoginFlow() {
	// đợi đến khi user dispatch action login
	while (true) {
		const isLogggedIn = Boolean(localStorage.getItem(LOCAL_STORAGE_NAMES.ACCESS_TOKEN));
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


// export default function* authSaga() {
// 	yield takeLatest(authActions.login.type, handleLogin)
// };

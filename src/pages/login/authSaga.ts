import { PayloadAction } from "@reduxjs/toolkit";
import { authActions } from "./authSlice";
import { call, delay, fork, put, take, takeLatest } from "redux-saga/effects";
import { redirect, useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_NAMES, ROUTE_PATH } from "utils/constant";
import userApi from "api/userApi";
import { LoginPayload, LoginRes, User } from "models";
import { all } from "axios";

function* handleLogin(payload: LoginPayload) {
	try {
		// yield delay(1000);
		const { params, callback } = payload;
		console.log('login payload', payload);
		const data: LoginRes = {
			email: params.email,
			role: 'ADMIN',
			accessToken:'accessTOkenasdfdjkdjkfsdjfdskfdjfdfdkjfgfdgfdg',
			tokenType: 'Bear'
		}
		// const data: LoginRes = yield call(userApi.login, params)
		console.log('response loggin', data);
		// localStorage.setItem(LOCAL_STORAGE_NAMES.ACCESS_TOKEN, data.accessToken);
		// yield call()
		const currentUser: User = {
			email: params.email,
			role: data.role
		}
		yield all([
			put(authActions.saveCurrentUser(currentUser)),
			put(authActions.loginSuccess()),
			// put(redirect(ROUTE_PATH.LOGIN))
		])
		callback  && callback();

		// redirect to admin page
		// yield put(navigate(ROUTE_PATH.ADMIN));

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

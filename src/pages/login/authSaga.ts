import { PayloadAction } from "@reduxjs/toolkit";
import { authActions, selectIsLoggedIn } from "./authSlice";
import { all, call, fork, put, select, take, takeLatest } from "redux-saga/effects";
import { redirect } from "react-router-dom";
import { COOKIE_NAMES, LOCAL_STORAGE_NAMES, ROUTE_PATH } from "utils/constant";
import userService from "api/userApi";
import { AuthPayload, ErrorData, LoginRes } from "models";
import { setCookie } from "utils";

const saveToken = ({ accessToken, refreshToken }: LoginRes) => {
	accessToken && setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, 1);
	refreshToken && setCookie(COOKIE_NAMES.REFRESHER_TOKEN, refreshToken, 1);
};

function* handleLogin({ payload }: PayloadAction<AuthPayload>) {
	try {
		yield put(authActions.loadingRequest());
		const { params, callback } = payload;
		const data: LoginRes = yield call(userService.login, params)
		if (data?.accessToken) {
			saveToken({ accessToken: data.accessToken, refreshToken: data.refreshToken });
		}

		yield all([
			put(authActions.loadingSuccess()),
			put(authActions.saveCurrentUser(data))
		])

		callback instanceof Function && callback();

	} catch (error: unknown) {
		const knownError = error as ErrorData;
		yield put(authActions.requestFailed(knownError))
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
		const isLogggedIn: boolean = yield select(selectIsLoggedIn)
		if (!isLogggedIn) {
			const action: PayloadAction<AuthPayload> = yield take(authActions.login.type);
			yield fork(handleLogin, action);
		}

		yield take(authActions.logout.type);
		yield call(handleLogout);
	}
}

function* handleRegister({ payload }: PayloadAction<AuthPayload>) {
	try {
		yield put(authActions.loadingRequest());
		const { params, callback } = payload;
		yield call(userService.registerAccount, params)
		yield put(authActions.loadingSuccess());
		callback instanceof Function && callback();
	} catch (error: unknown) {
		const knownError = error as ErrorData;
		yield put(authActions.requestFailed(knownError))
	}
}

export default function* authSaga() {
	console.log('auth saga');
	// yield fork(watchLoginFlow);
	yield takeLatest(authActions.login.type, handleLogin);
	yield takeLatest(authActions.resigter.type, handleRegister);
}


// export default function* authSaga() {
// 	yield takeLatest(authActions.login.type, handleLogin)
// };

import { all } from "redux-saga/effects";
import { authSaga } from "../pages/login/authSaga";
import homeSaga from "pages/home/homeSaga";

export default function* rootSaga() {
	console.log('root sagaa');
	yield all([
		authSaga(),
		homeSaga()
	])
};

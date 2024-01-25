import { all } from "redux-saga/effects";
import homeSaga from "pages/home/homeSaga";
import categorySaga from "pages/Admin/categories/categorySaga";
import authSaga from "pages/login/authSaga";

export default function* rootSaga() {
	console.log('root sagaa');
	yield all([
		authSaga(),
		homeSaga(),
		categorySaga(),
	])
};

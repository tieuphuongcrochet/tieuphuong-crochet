import { all } from "redux-saga/effects";
import homeSaga from "pages/home/homeSaga";
import categorySaga from "pages/Admin/categories/categorySaga";
import authSaga from "pages/login/authSaga";
import patternSaga from "saga/pattern/patternSaga";
import productSaga from "pages/Admin/products/productSaga";

export default function* rootSaga() {
	console.log('root sagaa');
	yield all([
		authSaga(),
		homeSaga(),
		categorySaga(),
		patternSaga(),
		productSaga()
	])
};

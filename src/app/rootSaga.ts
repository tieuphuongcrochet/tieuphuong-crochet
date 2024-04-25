import { all } from "redux-saga/effects";
import homeSaga from "pages/home/homeSaga";
import categorySaga from "saga/category/categorySaga";
import authSaga from "pages/login/authSaga";
import patternSaga from "saga/pattern/patternSaga";
import productSaga from "saga/product/productSaga";
import userSaga from "pages/Admin/users/userSaga";
import postSaga from "pages/Admin/posts/postSaga";

export default function* rootSaga() {
	yield all([
		authSaga(),
		homeSaga(),
		categorySaga(),
		patternSaga(),
		productSaga(),
		userSaga(),
		postSaga()
	])
};

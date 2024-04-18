import { all } from "redux-saga/effects";

import homeSaga from "pages/home/homeSaga";
import categorySaga from "pages/Admin/categories/categorySaga";
import authSaga from "pages/login/authSaga";
import patternSaga from "saga/pattern/patternSaga";
import productSaga from "pages/Admin/products/productSaga";
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

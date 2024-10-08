import { all } from "redux-saga/effects";
import homeSaga from "pages/home/homeSaga";
import categorySaga from "saga/category/categorySaga";
import authSaga from "pages/login/authSaga";
import patternSaga from "saga/pattern/patternSaga";
import productSaga from "saga/product/productSaga";
import userSaga from "pages/Admin/users/userSaga";
import postSaga from "saga/post/postSaga";
import settingSaga from "pages/Admin/SettingPage/SettingSaga";

export default function* rootSaga() {
	yield all([
		authSaga(),
		homeSaga(),
		categorySaga(),
		patternSaga(),
		productSaga(),
		userSaga(),
		postSaga(),
		settingSaga(),
	])
};

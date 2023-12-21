import { all, call, put, takeLatest } from "redux-saga/effects";
import { HomeData } from "models";
import homeApi from "api/homeApi";
import { homeActions } from "./homeSlice";

function* fetchDataHome() {
	try {
		yield put(homeActions.loadingRequest());
		const data: HomeData = yield call(homeApi.getAll);
		console.log('home data', data);

		yield all([
			put(homeActions.setData(data)),
			put(homeActions.loadingSuccess())
		])
	} catch (err) {
		console.log('Failed to fetch data home', err);
		put(homeActions.loadingSuccess())
	}
}

export default function* homeSaga() {
	yield takeLatest(homeActions.fetchData.type, fetchDataHome)
};

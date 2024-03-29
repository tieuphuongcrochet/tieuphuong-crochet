import { all, call, put, takeLatest } from "redux-saga/effects";
import { FileUpload, HomeData, Pattern } from "models";
import homeApi from "api/homeApi";
import { homeActions } from "./homeSlice";
import { filter, isEmpty, map } from "lodash";

function mapImagesPreview (images: FileUpload[]) {
const list = map(images, img => ({src: img.fileContent, alt: img.fileName}));
	return filter(list, l => !isEmpty(l.src));
}

function* fetchDataHome() {
	try {
		yield put(homeActions.loadingRequest());
		const data: HomeData = yield call(homeApi.getAll);
		console.log('home data', data);

		const freePatterns: Pattern[] = map(data.freePatterns, pt => ({
			id: pt.id,
			author: pt.author,
			name: pt.name,
			src: pt.images?.[0].fileContent,
			imagesPreview: mapImagesPreview(pt.images || [])
		}));
		yield all([
			// put(homeActions.setData(data)),
			put(homeActions.saveFreePatterns(freePatterns)),
			put(homeActions.loadingSuccess())
		])
	} catch (err) {
		console.log('Failed to fetch data home', err);
		yield put(homeActions.loadingSuccess())
	}
}

export default function* homeSaga() {
	yield takeLatest(homeActions.fetchData.type, fetchDataHome)
};

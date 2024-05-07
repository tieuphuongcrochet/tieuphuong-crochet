import { all, call, put, takeLatest } from "redux-saga/effects";
import { filter, isEmpty, map } from "lodash";

import { FileUpload, HomeData, Pattern, Product } from "models";
import homeApi from "api/homeApi";
import { homeActions } from "./homeSlice";
import { Post } from "models/post";
import { getAvatar } from "utils";

function mapImagesPreview(images: FileUpload[]) {
	const list = map(images, img => ({ src: img.fileContent, alt: img.fileName }));
	return filter(list, l => !isEmpty(l.src));
}

function* fetchDataHome() {
	try {
		yield put(homeActions.loadingRequest());
		const data: HomeData = yield call(homeApi.getAll);

		const freePatterns: Pattern[] = map(data.freePatterns, pt => ({
			id: pt.id,
			author: pt.author,
			name: pt.name,
			src: pt.images?.[0]?.fileContent,
			imagesPreview: mapImagesPreview(pt.images || [])
		}));

		const products: Product[] = map(data.products, prod => ({
			id: prod.id,
			name: prod.name,
			price: prod.price,
			currency_code: prod.currency_code,
			src: prod.images?.[0]?.fileContent,
			imagesPreview: mapImagesPreview(prod.images || []),
			category: prod.category
		}));

		const blogs: Post[] = map(data.blogs, bl => ({
			...bl,
			src: getAvatar(bl.files || [])
		}));

		yield all([
			put(homeActions.setData({
				banners: data.banners,
				products: products,
				freePatterns,
				blogs
			})),
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
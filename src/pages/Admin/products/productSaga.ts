import { DataType, ListResponse, Product, ProductPayload, initialListParams } from 'models';
import { all, call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { map } from 'lodash';
import { productAction } from './productSlice';
import productService from 'api/product';


function* fetchProducts({ payload }: any) {
	try {
		yield put(productAction.loadingRequest());
		const res: ListResponse<Product> = yield call(productService.getAll, payload);
		const newData = map(res.contents, item => ({
			...item,
			key: item.id,
			name: item.name,
			author: item.author,
			description: item.description,
			images: item.images?.map(f => ({...f, url: f?.fileContent})),
			src: item.images?.[0]?.fileContent,
		}));
		yield all([
			put(productAction.saveData({ data: newData, total: res.totalElements })),
			put(productAction.loadingSuccess())
		])
	} catch (err) {
		console.log('Failed to fetch product data', err);
		yield put(productAction.loadingSuccess())
	}
}

function* handleCreateUpdate({ payload }: PayloadAction<ProductPayload>) {
	const { params, callback } = payload;

	try {
		yield put(productAction.loadingRequest());
		yield call(productService.add, params);
		yield put(productAction.loadingSuccess());
		callback instanceof Function && callback();

	} catch (err) {
		console.log('Failed to CU product', err);
		yield put(productAction.loadingSuccess());
	}
};

function* handleGetProductById({ payload }: PayloadAction<string>) {
	try {
		yield put(productAction.loadingRequest());
		const data: Product = yield call(productService.getById, payload);		
		const newData: Product = {
			...data,
			src: data.images?.[0]?.fileContent,
			images: data.images?.map(f => ({...f, url: f?.fileContent}))
		};

		yield put(productAction.saveProduct(newData));
	} catch (error) {
		console.log('Failed to CU Product', error);
		yield put(productAction.loadingSuccess());
	}
}

function* handleDeleteById({ payload }: PayloadAction<React.Key>) {
	try {
		yield put(productAction.loadingRequest());
		yield call(productService.remove, payload);

		yield call(fetchProducts, {payload: initialListParams});
		yield put(productAction.loadingSuccess());
	} catch (err) {
		console.log('Failed to CU product', err);
		yield put(productAction.loadingSuccess());
	}
};

export default function* productSaga() {
	yield takeLatest(productAction.fetchData.type, fetchProducts);
	yield takeLatest(productAction.cUProduct.type, handleCreateUpdate);
	yield takeLatest(productAction.fetchProduct.type, handleGetProductById);
	yield takeLatest(productAction.delete.type, handleDeleteById);

};

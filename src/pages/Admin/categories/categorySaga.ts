import { Category, initialListParams } from 'models';
import { categoryAction } from './categorySlice';
import { all, call, put, takeLatest } from "redux-saga/effects";
import category from 'api/category';
import { PayloadAction } from '@reduxjs/toolkit';
import { mapTreeData } from 'utils';


function* fetchCategories(payload: any) {
	try {
		yield put(categoryAction.loadingRequest());
		const data: Category[] = yield call(category.getAll);
		const newData = mapTreeData(data);
		yield all([
			put(categoryAction.saveData(newData)),
			put(categoryAction.loadingSuccess())
		])
	} catch (err) {
		console.log('Failed to fetch categories data', err);
		yield put(categoryAction.loadingSuccess())
	}
}

function* handleCreate({ payload }: PayloadAction<Category>) {
	try {
		yield put(categoryAction.loadingRequest());
		const data: Category[] = yield call(category.add, payload);
		console.log('create', data);
		
		yield call(fetchCategories, initialListParams);
		yield put(categoryAction.loadingSuccess());

	} catch (err) {
		console.log('Failed to CU category', err);
		yield put(categoryAction.loadingSuccess());
	}
};

function* handleUpdate({ payload }: PayloadAction<Category>) {
	try {
		yield put(categoryAction.loadingRequest());
		yield call(category.update, payload);
		
		yield call(fetchCategories, initialListParams);
		yield put(categoryAction.loadingSuccess());

	} catch (err) {
		console.log('Failed to CU category', err);
		yield put(categoryAction.loadingSuccess());
	}
};

function* handleDeleteById({ payload }: PayloadAction<React.Key>) {
	try {
		yield put(categoryAction.loadingRequest());
		yield call(category.remove, payload);

		yield call(fetchCategories, initialListParams);
		yield put(categoryAction.loadingSuccess());

	} catch (err) {
		console.log('Failed to CU category', err);
		yield put(categoryAction.loadingSuccess());
	}
};

export default function* categorySaga() {
	yield takeLatest(categoryAction.fetchData.type, fetchCategories);
	yield takeLatest(categoryAction.create.type, handleCreate);
	yield takeLatest(categoryAction.update.type, handleUpdate);
	yield takeLatest(categoryAction.delete.type, handleDeleteById);
};

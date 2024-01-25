import { Category, DataType } from 'models';
import { categoryAction } from './categorySlice';
import { all, call, put, takeLatest } from "redux-saga/effects";
import category from 'api/category';
import { PayloadAction } from '@reduxjs/toolkit';
import { map } from 'lodash';


function* fetchCategories(payload: any) {
    console.log('api category', payload);
	try {
		yield put(categoryAction.loadingRequest());
		const data: Category[] = yield call(category.getAll);
		console.log('Category data', data);
		const newData = map(data, item => ({
			key: item.id,
			name: item.categoryName
		}));
		yield all([
			put(categoryAction.saveData(newData)),
			put(categoryAction.loadingSuccess())
		])
	} catch (err) {
		console.log('Failed to fetch categories data', err);
		yield put(categoryAction.loadingSuccess())
	}
}

function *handleCreateUpdate({payload}: PayloadAction<DataType>){
    console.log('create', payload);
	try {
		yield put(categoryAction.loadingRequest());
		const data: DataType[] = yield call(category.add, payload);
		console.log('Category data', data);
		yield call(fetchCategories, '');
		yield put(categoryAction.loadingSuccess());

	} catch (err) {
		console.log('Failed to CU category', err);
		yield put(categoryAction.loadingSuccess());
	}
};

export default function* categorySaga() {
	yield takeLatest(categoryAction.fetchData.type, fetchCategories);
	yield takeLatest(categoryAction.cUCategory.type, handleCreateUpdate);
};

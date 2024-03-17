import { DataType, Pattern } from 'models';
import { all, call, put, takeLatest } from "redux-saga/effects";
import category from 'api/category';
import { PayloadAction } from '@reduxjs/toolkit';
import { map } from 'lodash';
import { patternAction } from './productSlice';


function* fetchCategories(payload: any) {
    console.log('api category', payload);
	try {
		yield put(patternAction.loadingRequest());
		const data: Pattern[] = yield call(category.getAll);
		console.log('Category data', data);
		const newData = map(data, item => ({
			key: item.id,
			// name: item.categoryName
		}));
		yield all([
			put(patternAction.saveData(newData)),
			put(patternAction.loadingSuccess())
		])
	} catch (err) {
		console.log('Failed to fetch categories data', err);
		yield put(patternAction.loadingSuccess())
	}
}

function *handleCreateUpdate({payload}: PayloadAction<DataType>){
    console.log('create', payload);
	try {
		yield put(patternAction.loadingRequest());
		const data: DataType[] = yield call(category.add, payload);
		console.log('Category data', data);
		yield call(fetchCategories, '');
		yield put(patternAction.loadingSuccess());

	} catch (err) {
		console.log('Failed to CU category', err);
		yield put(patternAction.loadingSuccess());
	}
};

export default function* categorySaga() {
	yield takeLatest(patternAction.fetchData.type, fetchCategories);
	yield takeLatest(patternAction.cUCategory.type, handleCreateUpdate);
};

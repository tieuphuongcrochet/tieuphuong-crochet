import { DataType, ListResponse, Pattern, PatternPayload, PayloadFile, initialListParams } from 'models';
import { all, call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { map } from 'lodash';
import { patternAction } from './patternSlice';
import uploadFile from 'api/uploadFile';
import patternService from 'api/pattern';


function* fetchPatterns({ payload }: any) {
	try {
		yield put(patternAction.loadingRequest());
		const res: ListResponse<Pattern> = yield call(patternService.getAll, payload);

		const newData = map(res.contents, item => ({
			key: item.id,
			name: item.name,
			author: item.author,
			description: item.description,
			files: item.files ? map(item.files, f => ({...f,url: f?.fileContent})) : [],
			src: item.images?.[0]?.fileContent
		}));
		yield all([
			put(patternAction.saveData({ data: newData, total: res.totalElements })),
			put(patternAction.loadingSuccess())
		])
	} catch (err) {
		console.log('Failed to fetch patterns data', err);
		yield put(patternAction.loadingSuccess())
	}
}

function* handleCreateUpdate({ payload }: PayloadAction<PatternPayload>) {
	console.log('create', payload);
	const { params, callback } = payload;
	try {
		yield put(patternAction.loadingRequest());
		const data: DataType[] = yield call(patternService.add, params);
		console.log('Pattern data', data);
		callback instanceof Function && callback();
		yield put(patternAction.loadingSuccess());
	} catch (err) {
		console.log('Failed to CU Pattern', err);
		yield put(patternAction.loadingSuccess());
	}
};

function* uploadPatterns({ payload }: PayloadAction<PayloadFile>) {
	const { file, resolve } = payload;
	try {
		const formData = new FormData();
		formData.append('file ', file);
		const urlImg: string = yield call(uploadFile.upload, formData);
		console.log('urlImg', urlImg);

		if (resolve) {
			resolve(urlImg)
		}
	} catch (error) {
		resolve({ status: 'failed', error })
	}
}

function* handleGetPatternById({ payload }: PayloadAction<string>) {
	try {
		yield put(patternAction.loadingRequest());
		const data: Pattern = yield call(patternService.getById, payload);
		const newData: Pattern = {
			...data,
			src: data.images?.[0]?.fileContent,
			files: data.files ? map(data.files, f => ({...f, url: f?.fileContent})) : [],
			images: data.images ? map(data.images, f => ({...f, url: f?.fileContent})) : [],
		};

		console.log('get pattern by id, data: ', data, newData);
		yield put(patternAction.savePattern(newData));
	} catch (error) {
		console.log('Failed to CU Pattern', error);
		yield put(patternAction.loadingSuccess());
	}
}

/**
 * Handles the deletion of a pattern by ID.
 * @param payload - The ID of the pattern to be deleted.
 */
function* handleDeleteById({ payload }: PayloadAction<React.Key>) {
	try {
		yield put(patternAction.loadingRequest());
		yield call(patternService.remove, payload);

		yield call(fetchPatterns, {payload: initialListParams})
		yield put(patternAction.loadingSuccess());
	} catch (err) {
		console.log('Failed to CU pattern', err);
		yield put(patternAction.loadingSuccess());
	}
};

export default function* patternSaga() {
	yield takeLatest(patternAction.fetchData.type, fetchPatterns);
	yield takeLatest(patternAction.cUPattern.type, handleCreateUpdate);
	yield takeLatest(patternAction.uploadFiles.type, uploadPatterns);
	yield takeLatest(patternAction.fetchPattern.type, handleGetPatternById);
	yield takeLatest(patternAction.delete.type, handleDeleteById);
};

import { FileUpload, ListResponse, Pattern, PatternPayload, PayloadFile, initialListParams } from 'models';
import { all, call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { map } from 'lodash';
import { patternAction } from './patternSlice';
import uploadFile from 'api/uploadFile';
import patternService from 'api/pattern';
import { getAvatar } from 'utils';


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
			src: getAvatar(item.images as FileUpload[])
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
	const { params, callback } = payload;
	try {
		yield put(patternAction.loadingRequest());
		yield call(patternService.add, params);
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
			src: getAvatar(data.images as FileUpload[]),
			files: data.files ? map(data.files, f => ({...f, url: f?.fileContent})) : [],
			images: data.images ? map(data.images, f => ({...f, url: f?.fileContent})) : [],
		};

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

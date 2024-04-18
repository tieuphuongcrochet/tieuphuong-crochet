import { ListResponse } from 'models';
import { all, call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { postAction } from './postSlice';
import postService from 'api/post';
import { Post, PostPayload } from 'models/post';


function* fetchPosts({ payload }: any) {
	try {
		yield put(postAction.loadingRequest());
		const res: ListResponse<Post> = yield call(postService.getAll, payload);
		const newData = res.contents?.map(item => ({
			...item,
			key: item.id,
			name: item.title,
			content: item.content,
			createdDate: item.createdDate,
			src: item.files?.[0]?.fileContent,
			imagesPreview: item.files?.map(f => ({ src: f?.fileContent, alt: f?.fileName }))
		}));
		console.log('newData', newData);
		yield all([
			put(postAction.saveData({ data: newData, total: res.totalElements })),
			put(postAction.loadingSuccess())
		])
	} catch (err) {
		console.log('Failed to fetch post data', err);
		yield put(postAction.loadingSuccess())
	}
}

function* handleCreateUpdate({ payload }: PayloadAction<PostPayload>) {
	const { params, callback } = payload;

	try {
		yield put(postAction.loadingRequest());
		yield call(postService.add, params);
		yield call(fetchPosts, '');
		yield put(postAction.loadingSuccess());
		callback instanceof Function && callback();

	} catch (err) {
		console.log('Failed to CU category', err);
		yield put(postAction.loadingSuccess());
	}
};

export default function* postSaga() {
	yield takeLatest(postAction.fetchData.type, fetchPosts);
	yield takeLatest(postAction.cUPost.type, handleCreateUpdate);
};

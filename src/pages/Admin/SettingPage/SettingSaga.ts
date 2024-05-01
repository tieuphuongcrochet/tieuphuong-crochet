import { DataType } from 'models';
import { all, call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { settingAction } from './SettingSlice';
import { Banner, IBannerType } from 'models/setting';
import setting from 'api/setting';
import { map } from 'lodash';
import { notification } from 'utils';


function* fetchBannerTypes() {
	try {
		yield put(settingAction.loadingRequest('bannerType'));
		const data: IBannerType[] = yield call(setting.getBannerTypes);
		const bannerTypes: DataType[] = map(data, bt => ({
			id: bt.id,
			name: bt.name,
			key: bt.id || '',
			createdDate: bt.createdDate
		}));

		yield all([
			put(settingAction.saveBannerTypes(bannerTypes)),
			put(settingAction.loadingSuccess('bannerType'))
		])
	} catch (err) {
		console.log('Failed to fetch categories data', err);
		yield put(settingAction.loadingSuccess('bannerType'))
	}
}

function* handleCUBType({ payload }: PayloadAction<IBannerType>) {
	try {
		yield put(settingAction.loadingRequest('bannerType'));
		yield call(setting.cUBannerType, payload);

		notification.success({
			message: 'Successfull!',
			description: 'The banner type has been successfully updated!'
		});

		yield call(fetchBannerTypes);
		yield put(settingAction.loadingSuccess('bannerType'));

	} catch (err) {
		console.log('Failed to CU category', err);
		yield put(settingAction.loadingSuccess('bannerType'));
	}
};

function* fetchBanners() {
	try {
		yield put(settingAction.loadingRequest('banner'));
		const data: Banner[] = yield call(setting.getAllBanners);
		const newBanners = map(data, d => ({
			...d,
			bannerTypeId: d.bannerType?.id
		} as Banner))
		yield all([
			put(settingAction.saveBanners(newBanners)),
			put(settingAction.loadingSuccess('banner'))
		])
	} catch (err) {
		console.log('Failed to fetch categories data', err);
		yield put(settingAction.loadingSuccess('banner'))
	}
}

function* handleCUBanner({ payload }: PayloadAction<Banner[]>) {
	try {
		yield put(settingAction.loadingRequest('banner'));
		yield call(setting.cUBanners, payload);

		notification.success({
			message: 'Successfull!',
			description: 'The banners list has been successfully updated!'
		});
		yield put(settingAction.loadingSuccess('banner'));

	} catch (err) {
		console.log('Failed to CU category', err);
		yield put(settingAction.loadingSuccess('banner'));
	}
};

function* handleDelBannerType({ payload: id }: PayloadAction<React.Key>) {
	try {
		yield put(settingAction.loadingRequest('banner'));
		yield call(setting.removeBType, id);

		notification.success({
			message: 'Successfull!',
			description: 'The banner type has been successfully removed!'
		});
		yield call(fetchBannerTypes);
		yield put(settingAction.loadingSuccess('banner'));

	} catch (err) {
		console.log('Failed to CU category', err);
		yield put(settingAction.loadingSuccess('banner'));
	}
};

export default function* settingSaga() {
	yield takeLatest(settingAction.fetchBannerTypes.type, fetchBannerTypes);
	yield takeLatest(settingAction.cUBannerTypes.type, handleCUBType);
	yield takeLatest(settingAction.cUBanners.type, handleCUBanner);
	yield takeLatest(settingAction.fetchBanners.type, fetchBanners);
	yield takeLatest(settingAction.deleteBannerType.type, handleDelBannerType);
};

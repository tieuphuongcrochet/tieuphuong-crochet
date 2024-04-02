import { all, call, put, takeLatest } from 'redux-saga/effects';
import { userAction } from './userSlice';
import userService from 'api/userApi';
import { ListResponse, User } from 'models';
import { map } from 'lodash';


function* fetchUsers({payload}: any) {
    console.log('fetchUsers', payload);
    
    try {
        yield put(userAction.loadingRequest());
        const res: ListResponse<User> = yield call(userService.getAllUser, payload);
        const newData = map(res.contents, item => ({
            key: item.id,
            name: item.name,
            email: item.email,
            role: item.role,
            password: item.password,
            createdDate: item.createdDate,
            lastModifiedDate: item.lastModifiedDate
        }));
        yield all([
            put(userAction.saveData({ data: newData, total: res.totalElements })),
            put(userAction.loadingSuccess())
        ]);
    } catch (err) {
        console.log('Failed to fetch categories data', err);
        yield put(userAction.loadingSuccess());
    }
}


export default function* userSaga() {
    yield takeLatest(userAction.fetchData.type, fetchUsers);
};

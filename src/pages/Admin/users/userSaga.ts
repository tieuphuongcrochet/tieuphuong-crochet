import {all, call, put, takeLatest} from 'redux-saga/effects';
import {userAction} from './userSlice';
import userService from 'api/userApi';
import {AuthPayload, ListResponse, User} from 'models';
import {map} from 'lodash';
import {PayloadAction} from "@reduxjs/toolkit";
import React from "react";


function* fetchUsers({payload}: any) {
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
            put(userAction.saveData({data: newData, total: res.totalElements})),
            put(userAction.loadingSuccess())
        ]);
    } catch (err) {
        console.log('Failed to fetch categories data', err);
        yield put(userAction.loadingSuccess());
    }
}

function* handleGetUserById({payload}: PayloadAction<string>) {
    try {
        yield put(userAction.loadingRequest());
        const res: User = yield call(userService.getUserById, payload);
        yield put(userAction.saveUser(res));
        yield put(userAction.loadingSuccess());
    } catch (err) {
        console.log('Failed to fetch user by id', err);
        yield put(userAction.loadingSuccess());
    }
}

function* handleUpdateUser({payload}: PayloadAction<AuthPayload>) {
    const {params, callback} = payload;
    try {
        yield put(userAction.loadingRequest());
        yield call(userService.update, params);
        callback();
        yield put(userAction.loadingSuccess());
    } catch (err) {
        console.log('Failed to update user', err);
        yield put(userAction.loadingSuccess());
    }
}

function* handleDeleteUser({payload}: PayloadAction<React.Key>) {
    try {
        yield put(userAction.loadingRequest());
        yield call(userService.removeUserById, payload);
        yield call(fetchUsers, payload);
        yield put(userAction.loadingSuccess());
    } catch (err) {
        console.log('Failed to delete user', err);
        yield put(userAction.loadingSuccess());
    }
}

export default function* userSaga() {
    yield takeLatest(userAction.fetchData.type, fetchUsers);
    yield takeLatest(userAction.cUUser.type, handleUpdateUser);
    yield takeLatest(userAction.fetchUser.type, handleGetUserById);
    yield takeLatest(userAction.delete.type, handleDeleteUser);
};

import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import authReducer from 'pages/login/authSlice';
import homeReducer from 'pages/home/homeSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { history } from 'utils';
import categoryReducer from 'pages/Admin/categories/categorySlice';
import productReducer from 'pages/Admin/products/productSlice';
import patternReducer from 'saga/pattern/patternSlice';
import userReducer from 'pages/Admin/users/userSlice';
import postReducer from 'pages/Admin/posts/postSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  router: connectRouter(history),
  category: categoryReducer,
  pattern: patternReducer,
  product: productReducer,
  user: userReducer,
  post: postReducer
});

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware,
    routerMiddleware(history))
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

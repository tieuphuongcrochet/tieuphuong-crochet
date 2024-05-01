import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import {  HomeData } from "models";

export interface HomeState {
	loading: boolean,
	data: HomeData
};

const initialState: HomeState = {
	loading: false,
	data: {
		products: [],
		// patterns: [],
		freePatterns: [],
		banners: [],
		blogs: []
	}
};

const homeSlice = createSlice({
	name: 'home',
	initialState: initialState,
	reducers: {
		fetchData(state){
			state.loading = true;
		},
		loadingRequest(state) {
			state.loading = true;
		},
		loadingSuccess(state) {
			state.loading = false;
		},
		setData(state, {payload}: PayloadAction<HomeData>) {
			state.data.banners = payload.banners;
			state.data.products = payload.products;
			state.data.freePatterns = payload.freePatterns;
			state.data.blogs = payload.blogs;
		},
	},
})

// Actions
export const homeActions = homeSlice.actions;

//Selectors
export const selectHomeLoading = (state: RootState) => state.home.loading;
export const selectHomeProducts = (state: RootState) => state.home.data.products;
// export const selectHomePatterns = (state: RootState) => state.home.data.patterns;
export const selectHomeFreePatterns = (state: RootState) => state.home.data.freePatterns;
export const selectBanners = (state: RootState) => state.home.data.banners;
export const selectBlogs = (state: RootState) => state.home.data.blogs;

//Reducer
const homeReducer = homeSlice.reducer;
export default homeReducer;
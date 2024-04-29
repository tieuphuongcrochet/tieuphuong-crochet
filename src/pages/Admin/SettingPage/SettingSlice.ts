import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { DataType } from "models";
import { Banner, IBannerType, SettingState } from "models/setting";

const initialState: SettingState = {
	loading: { banner: false, bannerType: false },
	banners: [],
	bannerTypes: [],
}

const SettingSlice = createSlice({
	name: 'settingAdmin',
	initialState,
	reducers: {
		loadingRequest(state, { payload: name }: PayloadAction<'banner' | 'bannerType'>) {
			state.loading[name] = true;
		},
		loadingSuccess(state, { payload: name }: PayloadAction<'banner' | 'bannerType'>) {
			state.loading[name] = false;
		},
		saveBannerTypes(state, { payload }: PayloadAction<DataType[]>) {
			state.bannerTypes = payload;
		},
		saveBanners(state, { payload }: PayloadAction<Banner[]>) {
			state.banners = payload;
		},

		fetchBannerTypes() { },
		fetchBanners() { },
		cUBannerTypes(_, { payload }: PayloadAction<IBannerType>) { },
		cUBanners(_, { payload }: PayloadAction<Banner[]>) { },
		deleteBannerType(_, { payload }: PayloadAction<React.Key>) { },
	}
});

export const settingAction = SettingSlice.actions;

// Selectors
export const selectLoading = (state: RootState) => state.setting.loading;
export const selectBanners = (state: RootState) => state.setting.banners;
export const selectBannerTypes = (state: RootState) => state.setting.bannerTypes;

// Reducer
const settingReducer = SettingSlice.reducer;
export default settingReducer;
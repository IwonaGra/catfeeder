import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import catReducer from "./features/catSlice";
import feedingReducer from "./features/feedingSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer, // autoryzacja
		cats: catReducer, // koty
		feedings: feedingReducer, // karmienie
	},
});

export default store;

import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";
import loginReducer from "./login";
import featuredCharReducer from "./featuredChar";
import featuredCharImgReducer from "./featuredCharImg";
import isEditingReducer from "./isEditing";

export const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    featuredChar: featuredCharReducer,
    featuredCharImg: featuredCharImgReducer,
    isEditing: isEditingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

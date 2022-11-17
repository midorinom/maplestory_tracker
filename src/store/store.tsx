import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";
import loginReducer from "./login";
import dashboardReducer from "./dashboard";
import dailiesReducer from "./dailies";

export const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    dashboard: dashboardReducer,
    dailies: dailiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";
import loginReducer from "./login";
import dashboardReducer from "./dashboard";

export const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

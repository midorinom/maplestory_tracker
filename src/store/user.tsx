import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../types/types";

interface userState {
  userData: UserData;
}

const initialState: userState = {
  userData: {
    username: "",
    role: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserData>) {
      state.userData = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;

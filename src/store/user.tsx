import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData, SetUserData } from "../types/types";

interface userState {
  userData: UserData;
}

const initialState: userState = {
  userData: {
    username: "",
    role: "",
    characters: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<SetUserData>) {
      state.userData = { ...state.userData, ...action.payload };
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;

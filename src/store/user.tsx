import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData, Character } from "../types/types";

interface userState {
  userData: UserData;
}

interface SetUserData {
  username?: string;
  role?: string;
  characters?: Character[];
  main?: Character | null;
}

const initialState: userState = {
  userData: {
    username: "",
    role: "",
    characters: [],
    main: null,
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

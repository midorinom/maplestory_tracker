import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character, SetDashboard } from "../types/types";

interface dashboardState {
  featuredChar: Character;
}

const initialState: dashboardState = {
  featuredChar: {
    uuid: "",
    username: "",
    class_name: "",
    ign: "",
    level: 0,
    is_main: false,
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboard(state, action: PayloadAction<SetDashboard>) {
      state.featuredChar = {
        ...state.featuredChar,
        ...action.payload.featuredChar,
      };
    },
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice.reducer;

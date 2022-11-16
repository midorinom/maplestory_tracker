import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../types/types";

interface dashboardState {
  featuredChar: Character;
  isEditing: boolean;
}

export interface SetDashboard {
  featuredChar?: Character;
  isEditing?: boolean;
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
  isEditing: false,
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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../types/types";

interface dashboardState {
  featuredChar: Character;
  isEditing: boolean;
}

const initialState: dashboardState = {
  featuredChar: {
    uuid: "",
    username: "",
    class_name: "",
    ign: "",
    level: 0,
    is_main: false,
    tracking: "",
  },
  isEditing: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setFeaturedChar(
      state,
      action: PayloadAction<
        Character | Omit<Character, "username" | "tracking">
      >
    ) {
      state.featuredChar = {
        ...state.featuredChar,
        ...action.payload,
      };
    },
    setIsEditing(state, action: PayloadAction<boolean>) {
      state.isEditing = action.payload;
    },
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice.reducer;

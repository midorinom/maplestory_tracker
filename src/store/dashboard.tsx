import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character, TempCharacter } from "../types/types";

interface dashboardState {
  featuredChar: Character;
  isEditing: boolean;
  tempChar: TempCharacter;
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
  tempChar: {
    image: "",
    uuid: "",
    username: "",
    class_name: "",
    ign: "",
    level: 0,
    is_main: false,
    tracking: "",
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setFeaturedChar(state, action: PayloadAction<Character>) {
      state.featuredChar = {
        ...state.featuredChar,
        ...action.payload,
      };
    },
    setIsEditing(state, action: PayloadAction<boolean>) {
      state.isEditing = action.payload;
    },
    setTempChar(state, action: PayloadAction<TempCharacter>) {
      state.tempChar = {
        ...state.tempChar,
        ...action.payload,
      };
    },
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice.reducer;

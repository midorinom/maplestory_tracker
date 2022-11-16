import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../types/types";

interface featuredCharState {
  featuredChar: Character;
}

const initialState: featuredCharState = {
  featuredChar: {
    uuid: "",
    username: "",
    class_name: "",
    ign: "",
    level: 0,
    is_main: false,
  },
};

const featuredCharSlice = createSlice({
  name: "featuredChar",
  initialState,
  reducers: {
    setFeaturedChar(state, action: PayloadAction<Character>) {
      state.featuredChar = {
        ...state.featuredChar,
        ...action.payload,
      };
    },
  },
});

export const featuredCharActions = featuredCharSlice.actions;

export default featuredCharSlice.reducer;

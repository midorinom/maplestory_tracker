import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../types/types";

interface dailiesState {
  characters: Character[];
  featuredChar: Character;
  charImg: string;
}

const initialState: dailiesState = {
  characters: [],
  featuredChar: {
    uuid: "",
    username: "",
    class_name: "",
    ign: "",
    level: 0,
    is_main: false,
    tracking: "",
  },
  charImg: "",
};

const dailiesSlice = createSlice({
  name: "dailies",
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<Character[]>) {
      state.characters = [...state.characters, ...action.payload];
    },
    setFeaturedChar(state, action: PayloadAction<Character>) {
      state.featuredChar = {
        ...state.featuredChar,
        ...action.payload,
      };
    },
    setCharImg(state, action: PayloadAction<string>) {
      state.charImg = action.payload;
    },
  },
});

export const dailiesActions = dailiesSlice.actions;

export default dailiesSlice.reducer;

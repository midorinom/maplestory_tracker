import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../types/types";

interface dailiesState {
  characters: Character[];
  featuredChar: Character;
  charImg: string;
  editedDailies: string[];
  editedWeeklies: string[];
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
  editedDailies: [],
  editedWeeklies: [],
};

const dailiesSlice = createSlice({
  name: "dailies",
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<Character[]>) {
      state.characters = [...action.payload];
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
    setEditedDailies(state, action: PayloadAction<string[]>) {
      state.editedDailies = action.payload;
    },
    setEditedWeeklies(state, action: PayloadAction<string[]>) {
      state.editedWeeklies = action.payload;
    },
  },
});

export const dailiesActions = dailiesSlice.actions;

export default dailiesSlice.reducer;

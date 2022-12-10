import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../types/types";

interface bossingState {
  characters: Character[];
}

const initialState: bossingState = {
  characters: [],
};

const bossingSlice = createSlice({
  name: "bossing",
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<Character[]>) {
      state.characters = [...action.payload];
    },
  },
});

export const bossingActions = bossingSlice.actions;

export default bossingSlice.reducer;

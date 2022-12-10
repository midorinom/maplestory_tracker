import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../types/types";

interface bossingState {
  charactersCurrentPage: Character[];
}

const initialState: bossingState = {
  charactersCurrentPage: [],
};

const bossingSlice = createSlice({
  name: "bossing",
  initialState,
  reducers: {
    setCharactersCurrentPage(state, action: PayloadAction<Character[]>) {
      state.charactersCurrentPage = [...action.payload];
    },
  },
});

export const bossingActions = bossingSlice.actions;

export default bossingSlice.reducer;

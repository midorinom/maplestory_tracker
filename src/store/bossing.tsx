import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character, Bossing } from "../types/types";

interface bossingState {
  charactersCurrentPage: Character[];
  bossingCurrentPage: Bossing[];
}

const initialState: bossingState = {
  charactersCurrentPage: [],
  bossingCurrentPage: [],
};

const bossingSlice = createSlice({
  name: "bossing",
  initialState,
  reducers: {
    setCharactersCurrentPage(state, action: PayloadAction<Character[]>) {
      state.charactersCurrentPage = [...action.payload];
    },
    setBossingCurrentPage(state, action: PayloadAction<Bossing[]>) {
      state.bossingCurrentPage = [...action.payload];
    },
    pushBossingCurrentPage(state, action: PayloadAction<Bossing>) {
      state.bossingCurrentPage = [...state.bossingCurrentPage, action.payload];
    },
  },
});

export const bossingActions = bossingSlice.actions;

export default bossingSlice.reducer;

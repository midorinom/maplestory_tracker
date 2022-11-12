import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface loginState {
  page: String;
}

const initialState: loginState = {
  page: "login",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<String>) {
      state.page = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;

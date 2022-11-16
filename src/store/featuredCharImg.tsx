import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface featuredCharImgState {
  featuredCharImg: string;
}

const initialState: featuredCharImgState = {
  featuredCharImg: "",
};

const featuredCharImgSlice = createSlice({
  name: "featuredCharImg",
  initialState,
  reducers: {
    setFeaturedCharImg(state, action: PayloadAction<string>) {
      state.featuredCharImg = action.payload;
    },
  },
});

export const featuredCharImgActions = featuredCharImgSlice.actions;

export default featuredCharImgSlice.reducer;

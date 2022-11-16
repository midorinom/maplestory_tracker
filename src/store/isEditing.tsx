import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface isEditingState {
  isEditing: boolean;
}

const initialState: isEditingState = {
  isEditing: false,
};

const isEditingSlice = createSlice({
  name: "isEditing",
  initialState,
  reducers: {
    setIsEditing(state, action: PayloadAction<boolean>) {
      state.isEditing = action.payload;
    },
  },
});

export const isEditingActions = isEditingSlice.actions;

export default isEditingSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    isLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { isLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

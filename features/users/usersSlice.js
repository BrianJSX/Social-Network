import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: null,
  email: null,
  name: null,
  username: null,
  avatar: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginSuccess } = usersSlice.actions;

export default usersSlice.reducer;

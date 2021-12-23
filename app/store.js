import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from "../features/loading/loadingSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    users: usersReducer
  },
})
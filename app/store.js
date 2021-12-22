import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from "../features/loading/loadingSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
  },
})
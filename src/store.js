import { configureStore } from "@reduxjs/toolkit";

import userReducer from './assets/features/userSlice'

export const store = configureStore({
  reducer: {
    userState: userReducer,
  },
});
/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";







  const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('user')) || null;
  };

const initialState = {
    user: getUserFromLocalStorage(),
  };

  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      loginUser: (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      },
      logoutUser: (state) => {
        state.user = null;
        localStorage.removeItem('user');
        toast.success('Logged out successfully');
      }
    }
  });
  
  export const { loginUser, logoutUser } = userSlice.actions;
  
  export default userSlice.reducer;
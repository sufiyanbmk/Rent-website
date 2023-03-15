/* eslint-disable */
import { Exposure } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name:"user",
  initialState:{
    user:null,
  },
  reducers:{
    login:(state,action)=>{
      state.user = action.payload;
    },
    remove:(state)=>{
      state.user = null;
    },
  },
})

export const { login, remove} = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
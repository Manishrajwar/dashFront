import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  user: localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : sessionStorage.getItem("user")
  ? JSON.parse(sessionStorage.getItem("user"))
  : null
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
  
    setAccessToken(state, value) {
      state.accessToken = value.payload;
    },
    setUser(state , value){
      state.user = value.payload
    }
  },
});

export const { setAccessToken , setUser } = authSlice.actions;

export default authSlice.reducer;

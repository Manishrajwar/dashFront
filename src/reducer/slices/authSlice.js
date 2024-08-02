import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: localStorage.getItem("accessToken") ?JSON.parse(localStorage.getItem("accessToken")): null,
   user: localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")): null ,
   loading: false , 
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
    } , 
    setLoading(state , value){
      state.loading = value.payload 
    }
  },
});

export const { setAccessToken , setUser , setLoading } = authSlice.actions;

export default authSlice.reducer;

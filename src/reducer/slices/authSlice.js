import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refreshToken: null,

  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setRefreshToken(state, value) {
      state.refreshToken = value.payload;
    },
    setAccessToken(state, value) {
      state.accessToken = value.payload;
    },
  },
});

export const { setRefreshToken, setAccessToken } = authSlice.actions;

export default authSlice.reducer;

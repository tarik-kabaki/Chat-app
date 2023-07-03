import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    CurrentUser: null,
    Token: null,
  },
  reducers: {
    login: (state, action) => {
      state.Token = action.payload;
    },

    TokenDecode: (state, action) => {
      state.CurrentUser = action.payload;
    },
  },
});

export const { login, TokenDecode } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    CurrentUser: null,
    Token: null,
    users: [],
  },
  reducers: {
    login: (state, action) => {
      state.Token = action.payload;
    },

    TokenDecode: (state, action) => {
      state.CurrentUser = action.payload;
    },

    fetchUsers: (state, action) => {
      state.users.push(...action.payload);
    },
  },
});

export const { login, TokenDecode, fetchUsers } = userSlice.actions;
export default userSlice.reducer;

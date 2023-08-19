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
      state.users.map((item) =>
        item?.room?.map((x) => x.messages?.sort((a, b) => a.id - b.id))
      );
      state.users.map((item) =>
        item?.rooms?.map((x) => x.messages?.sort((a, b) => a.id - b.id))
      );
    },

    handleUsersRoom: (state, action) => {
      const users = state.users.find(
        (item) => item.id === action.payload.receiver
      );

      if (users.room.find((x) => x?.id === action.payload.roomData.id)) {
        console.log("room is exist");
      } else {
        if (users.rooms.find((y) => y?.id === action.payload.roomData.id)) {
          console.log("rooms is exist");
        } else {
          users.rooms.push(action.payload.roomData);
        }
      }
    },

    handleUsersMessages: (state, action) => {
      try {
        const users = state.users
          .find((item) => item.id === action.payload.to)
          .rooms?.find((x) => x?.id === action.payload.room.id).messages;
        users.push(action.payload);
        users.reverse();
      } catch (error) {
        const user = state.users
          .find((item) => item.id === action.payload.to)
          .room?.find((x) => x?.id === action.payload.room.id).messages;

        user.push(action.payload);
      }
    },

    logout: (state) => {
      state.CurrentUser = null;
      state.Token = null;
      state.users = [];
    },
  },
});

export const {
  login,
  TokenDecode,
  fetchUsers,
  handleUsersMessages,
  handleUsersRoom,
  logout,
} = userSlice.actions;
export default userSlice.reducer;

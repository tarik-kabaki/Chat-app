import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    CurrentUser: null,
    Token: null,
    users: [],
    notification: [],
    isOnline: false,
    stream: null,
    audioCalling: false,
    videoCalling: false,
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

    handleRemoveUsersMessages: (state, action) => {},

    /* handleUsersMessages: (state, action) => {
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
    },*/

    handleUsersMessages: (state, action) => {},

    handleDashboardMessages: (state, action) => {
      const findRoom = state.users.find(
        (user) => user.id === action.payload.receiver.id
      );
      const roomCheckout = findRoom.room.id === action.payload.room.id;
      if (roomCheckout) {
        findRoom.room
          .find((room) => room.id === action.payload.room.id)
          .messages.push(action.payload);
      }

      /*if (!roomCheckout) {
        findRoom.rooms
          .find((rooms) => rooms.id === action.payload.room.id)
          .messages.push(action.payload);
      }*/
    },

    logout: (state) => {
      state.CurrentUser = null;
      state.Token = null;
      state.users = [];
    },

    // MediaStream //

    handleStream: (state, action) => {
      state.stream = action.payload;
    },

    // calling section //
    handleAudioCall: (state) => {
      state.audioCalling = true;
    },

    handleAudioCallEnd: (state) => {
      state.audioCalling = false;
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
  handleRemoveUsersMessages,
  handleDashboardMessages,
  handleStream,
  handleAudioCall,
  handleAudioCallEnd,
} = userSlice.actions;
export default userSlice.reducer;

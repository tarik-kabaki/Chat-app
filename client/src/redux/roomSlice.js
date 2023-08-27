import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "user",
  initialState: {
    Room: null,
    Rooms: [],
  },
  reducers: {
    handleRoom: (state, action) => {
      const messages = (state.Room = action.payload);
      messages.messages.sort((a, b) => a.id - b.id);
    },
    handleRoomArry: (state, action) => {
      state.Room.messages.push(...action.payload);
    },

    handleRoomMessages: (state, action) => {
      state.Room.messages.push(action.payload);
    },

    handleCustomRoom: (state, action) => {
      const Room = state.Room.name.includes(action.payload.room.name);
      if (Room) {
        state.Room.messages.push(action.payload);
      }
    },

    handleRemoveRoomMessage: (state, action) => {
      state.Room.messages.splice(
        state.Room.messages.findIndex(
          (item) => item.id === action.payload.messageId
        ),
        1
      );
    },

    logOut: (state) => {
      state.Room = null;
      state.Rooms = [];
    },
  },
});

export const {
  handleRoom,
  handleRoomMessages,
  handleCustomRoom,
  handleRoomArry,
  logOut,
  handleRemoveRoomMessage,
} = roomSlice.actions;
export default roomSlice.reducer;

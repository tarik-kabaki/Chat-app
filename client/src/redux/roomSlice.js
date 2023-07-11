import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "user",
  initialState: {
    Room: null,
    Rooms: [],
  },
  reducers: {
    handleRoom: (state, action) => {
      state.Room = action.payload;
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
  },
});

export const { handleRoom, handleRoomMessages, handleCustomRoom } =
  roomSlice.actions;
export default roomSlice.reducer;

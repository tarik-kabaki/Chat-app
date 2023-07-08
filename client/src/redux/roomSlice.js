import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "user",
  initialState: {
    Room: null,
  },
  reducers: {
    handleRoom: (state, action) => {
      state.Room = action.payload;
    },

    handleRoomMessages: (state, action) => {
      state.Room.messages.push(action.payload);
    },
  },
});

export const { handleRoom, handleRoomMessages } = roomSlice.actions;
export default roomSlice.reducer;

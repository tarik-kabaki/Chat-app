import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import roomSlice from "./roomSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    room: roomSlice,
  },
});

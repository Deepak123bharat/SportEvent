import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Features/authSlice";
import eventSlice from "./Features/eventSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    event: eventSlice,
  },
});

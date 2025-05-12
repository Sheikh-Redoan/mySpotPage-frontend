import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "../redux/features/serviceSlice";

export const store = configureStore({
  reducer: {
    service: serviceReducer,
  },
});

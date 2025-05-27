import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "../redux/features/serviceSlice";
import selectedStaffReducer from "../redux/features/staffSlice";

export const store = configureStore({
  reducer: {
    service: serviceReducer,
    selectedStaff: selectedStaffReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "../redux/features/serviceSlice";
import selectedStaffReducer from "../redux/features/staffSlice";
import languageReducer from "./features/languageSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    service: serviceReducer,
    selectedStaff: selectedStaffReducer,
    user: userReducer,
    language: languageReducer,
  },
});

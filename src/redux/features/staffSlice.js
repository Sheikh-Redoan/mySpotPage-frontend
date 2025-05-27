import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const selectedStaffSlice = createSlice({
  name: "selectedStaff",
  initialState,
  reducers: {
    setSelectedStaff: (state, action) => {
      return { ...state, selectedStaff: action.payload };
    },

    clearSelectedStaff: () => initialState,
  },
});

export const { setSelectedStaff, clearSelectedStaff } =
  selectedStaffSlice.actions;

export default selectedStaffSlice.reducer;

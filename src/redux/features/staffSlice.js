import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "0",
  selected: true,
  name: "Any Staff",
  designation: "Staff will be assigned later",
  picture: null,
};

const selectedStaffSlice = createSlice({
  name: "selectedStaff",
  initialState,
  reducers: {
    setSelectedStaff: (state, action) => {
      return { ...state, ...action.payload };
    },

    clearSelectedStaff: () => initialState,
  },
});

export const { setSelectedStaff, clearSelectedStaff } =
  selectedStaffSlice.actions;

export default selectedStaffSlice.reducer;

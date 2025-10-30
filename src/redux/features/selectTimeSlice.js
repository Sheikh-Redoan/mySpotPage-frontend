import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTime: "",
};

const selectTimeSlice = createSlice({
  name: "selectTime",
  initialState,
  reducers: {
    setTimeSelection: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearTimeSelection: () => initialState,
  },
});

export const { setTimeSelection, clearTimeSelection } = selectTimeSlice.actions;

export default selectTimeSlice.reducer;

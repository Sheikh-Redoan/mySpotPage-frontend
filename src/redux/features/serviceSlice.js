import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serviceName: "",
  description: "",
  thumbnail: null,
  availableFor: "",
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServiceData: (state, action) => {
      return action.payload;
    },
    clearServiceData: () => initialState,
  },
});

export const { setServiceData, clearServiceData } = serviceSlice.actions;

export default serviceSlice.reducer;

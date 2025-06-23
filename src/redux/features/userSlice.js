import { createSlice } from "@reduxjs/toolkit";

// const initialState = null;
const initialState = {
  name: "User",
  role: "admin",
  photoURL: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;

// {
//   name: "User",
//   role: "client",
//   photoURL: null,
// }

import { createSlice } from "@reduxjs/toolkit";

const defaultLanguage = JSON.parse(
  localStorage.getItem("defaultLanguage") || "{}"
);

const initialState = {
  code: defaultLanguage?.code || "en",
  language: defaultLanguage?.language || "English",
  direction: defaultLanguage?.direction || "ltr",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguageData: (state, action) => {
      localStorage.setItem("defaultLanguage", JSON.stringify(action.payload));
      return { ...state, ...action.payload };
    },
    clearLanguageData: () => {
      localStorage.removeItem("defaultLanguage");
      return initialState;
    },
  },
});

export const { setLanguageData, clearLanguageData } = languageSlice.actions;
export const selectLanguage = (state) => state.language;

export default languageSlice.reducer;

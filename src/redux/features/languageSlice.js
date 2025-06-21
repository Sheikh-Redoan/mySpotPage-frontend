import { createSlice } from "@reduxjs/toolkit";

const defaultLanguage = JSON.parse(
  localStorage.getItem("defaultLanguage") || "{}"
);

const initialState = {
  languageCode: defaultLanguage.languageCode || "en",
  languageName: defaultLanguage.languageName || "English",
  direction: defaultLanguage.direction || "ltr",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguageData: (state, action) => {
      localStorage.setItem("defaultLanguage", JSON.stringify(action.payload));
      return { ...state, ...action.payload };
    },
    clearLanguageData: () => initialState,
  },
});

export const { setLanguageData, clearLanguageData } = languageSlice.actions;
export const selectLanguage = (state) => state.language;

export default languageSlice.reducer;

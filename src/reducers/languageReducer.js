// reducers/languageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: localStorage.getItem("language") || "EN",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      localStorage.setItem("language", action.payload);
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;

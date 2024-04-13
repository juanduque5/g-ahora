// // reducers/languageSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   language: localStorage.getItem("language") || "ES",
// };

// export const languageSlice = createSlice({
//   name: "language",
//   initialState,
//   reducers: {
//     setLanguage: (state, action) => {
//       localStorage.setItem("language", action.payload);
//       state.language = action.payload;
//     },
//   },
// });

// export const { setLanguage } = languageSlice.actions;

// export default languageSlice.reducer;
// reducers/languageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: localStorage.getItem("language") || "ES",
  skeleton: false, // Estado inicial del skeleton
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      localStorage.setItem("language", action.payload);
      state.language = action.payload;
    },
    setSkeleton: (state, action) => {
      state.skeleton = action.payload;
    },
    resetSkeleton: (state) => {
      state.skeleton = false;
    },
  },
});

export const { setLanguage, setSkeleton, resetSkeleton } =
  languageSlice.actions;

export default languageSlice.reducer;

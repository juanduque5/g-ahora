import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "../reducers/languageReducer";

const store = configureStore({
  reducer: {
    language: languageReducer,
    // Puedes agregar más reducers aquí si los tienes
  },
});

export default store;

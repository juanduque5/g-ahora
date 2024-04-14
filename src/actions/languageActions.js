// actions/languageActions.js
export const SET_LANGUAGE = "SET_LANGUAGE";

export const setLanguage = (newLanguage) => ({
  type: SET_LANGUAGE,
  payload: newLanguage,
});

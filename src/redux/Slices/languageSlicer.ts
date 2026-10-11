import i18n from "@/lib/i18n";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language:
    typeof window !== "undefined"
      ? localStorage?.getItem("language") || "bn"
      : "bn",
};
const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("language", action.payload); // Persist in localStorage
      }
    },
    initializeLanguage(state) {
      if (typeof window !== "undefined") {
        const storedLanguage = localStorage.getItem("language");
        if (storedLanguage) {
          i18n.changeLanguage(storedLanguage);
          state.language = storedLanguage;
        }
      }
    },
  },
});
export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;

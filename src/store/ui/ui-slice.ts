import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeType = "theme-light" | "theme-dark";

interface UIState {
  theme: ThemeType;
}

const initialState: UIState = {
  theme: "theme-dark",
};

const uiSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const toggledTheme =
        state.theme === "theme-light" ? "theme-dark" : "theme-light";

      state.theme = toggledTheme;
    },
  },
});

export const { toggleTheme } = uiSlice.actions;

export default uiSlice.reducer;

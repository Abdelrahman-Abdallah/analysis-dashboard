import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "src/store";
export interface ThemeState {
  isDarkTheme: boolean;
}

const initialState: ThemeState = {
  isDarkTheme: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkTheme = action.payload;
    },
  },
});

export const toggleDarkMode =
  (): AppThunk =>
  (dispatch, getState): void => {
    const mode = getState().theme.isDarkTheme;
    dispatch(toggleTheme(!mode));
  };

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;

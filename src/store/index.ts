import { TypedUseSelectorHook, useSelector as useReduxSelector, useDispatch as useReduxDispatch } from "react-redux";
import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";

import dataReducer from "src/slices/Data";
import themeReducer from "src/slices/theme";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    theme: themeReducer,
  },
  devTools: true,
});

store.subscribe(() => {
  console.log(store.getState().data);
});
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();

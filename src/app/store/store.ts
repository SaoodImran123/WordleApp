import { configureStore } from "@reduxjs/toolkit";
import codesReducer from "./codesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      codes: codesReducer,

    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

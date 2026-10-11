import { configureStore } from "@reduxjs/toolkit";
import CartSlicer from "./Slices/CartSlicer";
import LabSlicer from "./Slices/LabSlice";
import languageSlice from "./Slices/languageSlicer";
import singleCartSlice from "./Slices/SingleCartSlicer";
export const makeStore = () => {
  return configureStore({
    reducer: {
      CartSlicer,
      LabSlicer,
      languageSlice,
      singleCartSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

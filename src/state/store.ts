import { configureStore } from "@reduxjs/toolkit";
import mazeBuilderReducer from "./maze/mazeBuilderSlice";
import searchAlgorithmReducrer from "./algorithm/searchAlgorithmSlice";

export const store = configureStore({
  reducer: {
    mazeBuilder: mazeBuilderReducer,
    searchAlgorithm: searchAlgorithmReducrer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

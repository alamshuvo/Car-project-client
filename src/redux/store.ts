import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter";
import baseApi from "./api/baseApi";

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    counter: counterReducer
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(baseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter";
import baseApi from "./api/baseApi";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./features/auth/authSlice";

const persistConfig = {
  key: "auth",
  storage
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    counter: counterReducer
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "REHYDRATE", "PAUSE", "PURGE", "FLUSH", "REGISTER"]
      }
    }).concat(baseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export default store;

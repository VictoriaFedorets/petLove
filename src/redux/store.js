import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice.js";
import newsReducer from "./news/newsSlice.js";
import noticesReducer from "./notices/noticesSlice.js";

const persistConfig = {
  key: "root",
  storage,
  //   whitelist: ["favourites"], // Тільки favourites буде збережено
};

const rootReducer = combineReducers({
  auth: authReducer,
  // user: userReducer,
  news: newsReducer,
  notices: noticesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

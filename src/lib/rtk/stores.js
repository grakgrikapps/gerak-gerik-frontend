import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { postsSlice } from "./features/posts/postSlice";
import { authSlice } from "./features/auth/authSlice";
import { arenaSlice } from "./features/arena/arenaSlice";
import { commentsSlice } from "./features/comments/commentSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Gabungkan slice
const rootReducer = combineSlices(
  postsSlice,
  authSlice,
  arenaSlice,
  commentsSlice
);

// Konfigurasi persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: [postsSlice.name, authSlice.name, arenaSlice.name], // hanya persist state `counter`, jangan quotesApi
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Konfigurasi store
export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            "persist/PERSIST",
            "persist/REHYDRATE",
            "persist/PAUSE",
            "persist/FLUSH",
            "persist/PURGE",
            "persist/REGISTER",
          ],
        },
      }),
  });

  return store;
};

// Buat store dan persistor
export const store = makeStore();
export const persistor = persistStore(store);

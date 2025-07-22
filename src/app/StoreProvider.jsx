"use client";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { store, persistor } from "@/lib/rtk/stores.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import { PersistGate } from "redux-persist/integration/react";

export const StoreProvider = ({ children }) => {
  useEffect(() => {
    // Optional: Enables refetchOnFocus/refetchOnReconnect
    setupListeners(store.dispatch);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={children} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

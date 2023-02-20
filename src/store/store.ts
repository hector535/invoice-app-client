import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import invoiceReducer from "./invoice/invoice-slice";
import uiReducer from "./ui/ui-slice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  predicate: () => true,
  effect: (_, listenerApi) => {
    localStorage.setItem("state", JSON.stringify(listenerApi.getState()));
  },
});

const globalState = JSON.parse(localStorage.getItem("state") || "{}");

export const store = configureStore({
  preloadedState: globalState,
  reducer: {
    invoice: invoiceReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

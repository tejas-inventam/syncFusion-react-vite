import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";

// import { setupListeners } from '@reduxjs/toolkit/query'

const rootReducer = combineReducers({
  product: productSlice,
});

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,

    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    // middleware: (getDefaultMiddleware) => {
    //   return getDefaultMiddleware().concat(quotesApiSlice.middleware)
    // },
    preloadedState,
  });

  // configure listeners using the provided defaults
  // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
  // setupListeners(store.dispatch)
  return store;
};

const store = makeStore();

export default store;

// Infer the type of `store`
export type AppStore = typeof store;

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

import { configureStore } from "@reduxjs/toolkit";
import { bookApiSlice } from "../features/BookApi/bookApiSlice";
import { searchReducer } from "../features/Searchredux/searchSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [bookApiSlice.reducerPath]: bookApiSlice.reducer,
    searchedData: searchReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApiSlice.middleware),
});

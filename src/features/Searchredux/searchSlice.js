import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchWord: null,
};

const searchSlice = createSlice({
  name: "searchBook",
  initialState,
  reducers: {
    searching: (state, action) => {
      state.searchWord = action.payload.searchWord;
    },
  },
});

// Action creators are generated for each case reducer function
export const { searching } = searchSlice.actions;

export const searchReducer = searchSlice.reducer; //sliceName.reducer

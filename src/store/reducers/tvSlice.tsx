import { createSlice } from "@reduxjs/toolkit";

interface tvSlice {
  value: number;
}

const initialState = {
  info: null,
};

export const tvSlice = createSlice({
  name: "Tv",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loadTV: (state, action) => {
      state.info = action.payload;
    },
    removeTV: (state, action) => {
      state.info = null;
    },
  },
});

export const { loadTV, removeTV } = tvSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default tvSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface movieSlice {
  value: number;
}

const initialState = {
  info: null,
};

export const movieSlice = createSlice({
  name: "movie",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loadMovie: (state, action: PayloadAction<any>) => {
      state.info = action.payload;
    },

    Movie: (state, action) => {
      state.info = action.payload;
    },
    removeMovie: (state) => {
      state.info = null;
    },
  },
});

export const { loadMovie, removeMovie } = movieSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default movieSlice.reducer;

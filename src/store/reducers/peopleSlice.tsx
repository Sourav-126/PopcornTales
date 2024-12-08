import { createSlice } from "@reduxjs/toolkit";

interface peopleSlice {
  value: number;
}

const initialState = {
  info: null,
};

export const peopleSlice = createSlice({
  name: "people",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loadPerson: (state, action) => {
      state.info = action.payload;
    },
    removePerson: (state, action) => {
      state.info = null;
    },
  },
});

export const { loadPerson, removePerson } = peopleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;p

export default peopleSlice.reducer;

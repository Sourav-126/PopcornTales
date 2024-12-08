import { configureStore } from "@reduxjs/toolkit";

import movieReducer from "./reducers/movieSlice";
import personReducer from "./reducers/peopleSlice";
import tvReducer from "./reducers/tvSlice";

const store = configureStore({
  reducer: {
    movie: movieReducer,
    person: personReducer,
    tv: tvReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

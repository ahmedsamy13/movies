import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import movieSlice from "./../features/movies/movieSlice";
import tvSlice from "./../features/TVs/tvSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    movie: movieSlice,
    tv: tvSlice,
  },
});
export default store;

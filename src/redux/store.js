import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import movieSlice from "./../features/movies/movieSlice";
import tvSlice from "./../features/TVs/tvSlice";
import watchListReducer from "./../features/watchList/watchListSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    movie: movieSlice,
    tv: tvSlice,
    watchList: watchListReducer,
  },
});
export default store;

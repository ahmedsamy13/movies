import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import authReducer from "../features/auth/authSlice";
import movieSlice from "./../features/movies/movieSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    movie: movieSlice,
  },
});
export default store;

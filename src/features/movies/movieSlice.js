import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTrendingMovies as fetchTrendingFromAPI } from "@/services/getTrendingMovies";
import { getMovieDetails as fetchDetailsFromAPI } from "@/services/getMovieById"; // 1. Thunk لجلب الأفلام التريند
export const fetchTrendingMovies = createAsyncThunk(
  "movies/getTrending",
  async (_, thunkAPI) => {
    try {
      const data = await fetchTrendingFromAPI();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// 2. Thunk لجلب تفاصيل فيلم محدد بواسطة الـ ID
export const fetchMovieById = createAsyncThunk(
  "movies/getById",
  async (movieId, thunkAPI) => {
    try {
      const data = await fetchDetailsFromAPI(movieId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    data: [], // قائمة الأفلام
    selectedMovie: null, // بيانات الفيلم المختار (ID)
    loading: false,
    error: null,
  },
  reducers: {
    // دالة لتفريغ بيانات الفيلم المختار عند الخروج من الصفحة
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // حالات الـ Trending Movies
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // حالات الـ Movie Details (ID)
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.selectedMovie = null; // نمسح الفيلم القديم فوراً لبدء تحميل الجديد
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearSelectedMovie } = movieSlice.actions;
export default movieSlice.reducer;

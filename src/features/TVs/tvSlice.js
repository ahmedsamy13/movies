import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTrendingTvs as fetchTrendingTvsFromAPI } from "@/services/getTrendingTvs";
import { getTvDetails as fetchTvDetailsFromAPI } from "@/services/getTvById";

// 1. Thunk لجلب المسلسلات التريند
export const fetchTrendingTvs = createAsyncThunk(
  "tvs/getTrending",
  async (_, thunkAPI) => {
    try {
      const data = await fetchTrendingTvsFromAPI();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// 2. Thunk لجلب تفاصيل مسلسل محدد بواسطة الـ ID
export const fetchTvById = createAsyncThunk(
  "tvs/getById",
  async (tvId, thunkAPI) => {
    try {
      const data = await fetchTvDetailsFromAPI(tvId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const tvSlice = createSlice({
  name: "tv",
  initialState: {
    data: [], // قائمة المسلسلات
    selectedTv: null, // بيانات المسلسل المختار
    loading: false,
    error: null,
  },
  reducers: {
    // دالة لتفريغ بيانات المسلسل المختار عند الخروج من الصفحة
    clearSelectedTv: (state) => {
      state.selectedTv = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // حالات الـ Trending TVs
      .addCase(fetchTrendingTvs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingTvs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTrendingTvs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // حالات الـ TV Details (ID)
      .addCase(fetchTvById.pending, (state) => {
        state.loading = true;
        state.selectedTv = null; // نمسح المسلسل القديم فوراً لبدء تحميل الجديد
        state.error = null;
      })
      .addCase(fetchTvById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTv = action.payload;
      })
      .addCase(fetchTvById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearSelectedTv } = tvSlice.actions;
export default tvSlice.reducer;

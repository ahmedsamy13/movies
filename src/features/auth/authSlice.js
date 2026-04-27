import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/services/supabase"; // الملف اللي عملناه امبارح

// 1. ثنك لتسجيل مستخدم جديد (Sign Up)
export const signUpUser = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, fullName }, thunkAPI) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      return {
        user: data.user,
        session: data.session,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// 2. ثنك لتسجيل الدخول (Login)
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Supabase بيرجع اليوزر والسيشن، احنا محتاجين اليوزر
      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// 3. ثنك لتسجيل الخروج (Logout)
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  user: null, // بنخزن كائن اليوزر كامل اللي جاي من سوبابيز
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // دالة مهمة عشان نحدث الحالة لو اليوزر عامل LoggedIn أصلاً
    setSession: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Logout Case
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      // SignUp Cases
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // ← كمان دي ناقصة
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = !!action.payload.session;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        // ← الـ case الناقصة
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSession } = authSlice.actions;
export default authSlice.reducer;

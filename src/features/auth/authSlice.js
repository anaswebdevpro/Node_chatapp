import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { loginAPI } from "../../services/authService";
import { apiRequest } from "../../services/Api";

// 🔐 LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const res = await apiRequest({
        endpoint: "users/login",
        method: "POST",
        data: credentials,
      });

      return res.data?.user 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message,
      );
    }
  },
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/Api";
import { LOGIN_URL } from "../../services/BaseUrls";

// 🔐 LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const res = await apiRequest({
        endpoint: LOGIN_URL,
        method: "POST",
        data: credentials,
      });

      return {
        user: res.data?.user || res.data,
        token: res.token,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message,
      );
    }
  },
);

const token = localStorage.getItem("token");
let parsedUser = null;
try {
  const cachedUser = localStorage.getItem("user");
  if (cachedUser) parsedUser = JSON.parse(cachedUser);
} catch (e) {
  console.error("Failed to parse cached user");
}

const initialState = {
  user: parsedUser,
  token: token || null,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        // Persist token and user
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

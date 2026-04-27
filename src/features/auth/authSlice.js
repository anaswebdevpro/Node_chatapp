import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "../../services/authService";
import { initSocket } from "../../services/socket";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const res = await loginAPI(credentials);

      // normalize response based on actual API payload
      return {
        user: res.data.data.user,
        token: res.data.token,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
const token = localStorage.getItem("token");
const initialState = {
  user: null,
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Login successful:", action.payload);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem("token", action.payload.token);

        //  use mock for now
        initSocket("mock");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

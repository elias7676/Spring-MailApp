import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  isFirstTimeLoading: false,
  isFirstTimeSuccess: false,
  isFirstTimeError: false,
  errorMsg: "",
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (userData, { rejectWithValue }) => {
    try {
      return await authService.userLogin(userData);
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const firstTimeUserLogin = createAsyncThunk(
  "auth/firstTimeUserLogin",
  async (userData, { rejectWithValue }) => {
    try {
      return await authService.firstTimeUserLogin(userData);
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const editAccount = createAsyncThunk(
  "auth/editAccount",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await authService.editAccount(userData, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.isFirstTimeLoading = false;
      state.isFirstTimeError = false;
      state.isFirstTimeSuccess = false;
    },
    [userLogin.fulfilled]: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    },
    [userLogin.rejected]: (state, action) => {
      localStorage.removeItem("user");
      state.isLoading = false;
      state.user = null;
      state.isError = true;
      state.errorMsg = action.payload;
    },
    [firstTimeUserLogin.pending]: (state) => {
      state.isFirstTimeLoading = true;
      state.isFirstTimeError = false;
      state.isFirstTimeSuccess = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
    [firstTimeUserLogin.fulfilled]: (state, action) => {
      state.isFirstTimeLoading = false;
      state.isFirstTimeSuccess = true;
    },
    [firstTimeUserLogin.rejected]: (state, action) => {
      state.isFirstTimeLoading = false;
      state.isFirstTimeError = true;
      state.errorMsg = action.payload;
    },
    [editAccount.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.isFirstTimeLoading = false;
      state.isFirstTimeError = false;
      state.isFirstTimeSuccess = false;
    },
    [editAccount.fulfilled]: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    },
    [editAccount.rejected]: (state, action) => {
      localStorage.removeItem("user");
      state.isLoading = false;
      state.user = null;
      state.isError = true;
      state.errorMsg = action.payload;
    },
    [logout.fulfilled]: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMsg = "";
      state.user = null;
    },
  },
});

export default authSlice.reducer;

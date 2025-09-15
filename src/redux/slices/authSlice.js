import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";

let parsedData = {};
try {
  const storedData = localStorage.getItem('data');
  if (storedData && storedData !== "undefined") {
    parsedData = JSON.parse(storedData);
  } else {
    parsedData = {};
  }
} catch (error) {
  console.warn("Invalid JSON in localStorage for 'data'", error);
  parsedData = {};
}

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
  role: localStorage.getItem('role') || '',
  data: parsedData,
};

export const createAccount = createAsyncThunk(
  '/auth/createAccount',
  async (data, { rejectWithValue }) => {
    console.log("incoming data to the thunk", data);
    try {
      const response = await toast.promise(
        axiosInstance.post('/users', data),
        {
          loading: 'Hold back tight, we are registering your id...',
          success: (res) => res?.data?.message || "Account created successfully",
          error: 'Ohh No!, Something went wrong. Please try again.',
        }
      );

      return response;
    } catch (error) {
      console.log("Signup Error:", error);
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const login = createAsyncThunk(
  '/auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axiosInstance.post('/auth/login', data),
        {
          loading: 'Hold back tight, logging you in...',
          success: (res) => res?.data?.message || "Login successful",
          error: 'Ohh No!, Something went wrong. Please try again.',
        }
      );

      const token = response?.data?.data?.token;
      console.log("Login Response:", response);

      if (token) {
        localStorage.setItem("authToken", token);
      }

      return response;
    } catch (error) {
      console.log("Login Error:", error);
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const logout = createAsyncThunk('/auth/logout', async () => {
  console.log("incoming data to the thunk");
  try {
    const response = await toast.promise(
      axiosInstance.post('/auth/logout'),
      {
        loading: 'Logging out...',
        success: (res) => res?.data?.message || "Logged out successfully",
        error: 'Ohh No!, Something went wrong. Please try again.',
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
});

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.role = action?.payload?.data?.data?.userRole;
        state.data = action?.payload?.data?.data?.userData;

        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('role', action?.payload?.data?.data?.userRole);
        localStorage.setItem('data', JSON.stringify(action?.payload?.data?.data?.userData));
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.setItem('isLoggedIn', false);
        localStorage.setItem('role', '');
        localStorage.setItem('data', JSON.stringify({}));
        state.isLoggedIn = false;
        state.role = '';
        state.data = {};
      });
  }
});

export default AuthSlice.reducer;

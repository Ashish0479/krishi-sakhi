
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";

// Initial State
const initialState = {
  data: null,
  loading: false,
  error: null,
};


export const fetchWeather = createAsyncThunk(
  "/weather/fetchWeather",
  async ({ city, lat, lon }, { rejectWithValue }) => {
    try {
      let url = "/weather";
      if (city) url += `?city=${city}`;
      else if (lat && lon) url += `?lat=${lat}&lon=${lon}`;

      const response = await axiosInstance.get(url);

     

      return response.data;
    } catch (error) {
      
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

// ✅ Slice
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Error fetching weather";
      });
  },
});

export default weatherSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  cropHealthReport: null,
  error: null,
};

// 🌱 Async thunk for analyzing crop health
export const analyzeCropHealth = createAsyncThunk(
  "crop/analyze",
  async ({ imageFile, language }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("language", language);

      const response = await axiosInstance.post("/crop/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Analysis completed successfully!");
      return response.data;
    } catch (error) {
      console.error("CropHealth API Error:", error);
      toast.error("Failed to analyze crop health.");
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

const cropHealthSlice = createSlice({
  name: "cropHealth",
  initialState,
  reducers: {
    resetCropHealth: (state) => {
      state.loading = false;
      state.cropHealthReport = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeCropHealth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzeCropHealth.fulfilled, (state, action) => {
        state.loading = false;
        state.cropHealthReport = action.payload?.cropHealthReport;
      })
      .addCase(analyzeCropHealth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export const { resetCropHealth } = cropHealthSlice.actions;
export default cropHealthSlice.reducer;

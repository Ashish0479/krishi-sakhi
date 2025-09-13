import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";

// Local storage se pichle messages load karo (agar hon)
let storedMessages = [];
try {
  const savedMessages = localStorage.getItem("chatMessages");
  if (savedMessages && savedMessages !== "undefined") {
    storedMessages = JSON.parse(savedMessages);
  }
} catch (error) {
  console.warn("Invalid JSON in localStorage for 'chatMessages'", error);
  storedMessages = [];
}

const initialState = {
  messages: storedMessages, // {farmerMessage, aiReply}
  loading: false,
  error: null,
};

// Thunk: send farmer's message to backend
export const sendMessage = createAsyncThunk(
  "chatbot/sendMessage",
  async ({ message, image }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("message", message);
      if (image) formData.append("image", image);

      const response = await axiosInstance.post("/chat", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("AI replied successfully ✨");
      console.log("Farmer Message:", message);
      console.log("AI Reply:", response?.data?.aiReply);

      return {
        farmerMessage: message,
        aiReply: response?.data?.aiReply,
      };
    } catch (error) {
      console.error("Chat Error:", error);
      toast.error("Failed to get AI response");
      return rejectWithValue(
        error.response?.data?.error || { message: "Chat failed" }
      );
    }
  }
);

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    clearChat: (state) => {
      state.messages = [];
      localStorage.removeItem("chatMessages");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);

        // Save updated chat in localStorage
        localStorage.setItem("chatMessages", JSON.stringify(state.messages));
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Something went wrong with chatbot";
      });
  },
});

export const { clearChat } = chatbotSlice.actions;
export default chatbotSlice.reducer;

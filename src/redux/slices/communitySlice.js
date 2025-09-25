import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";

// Fetch posts
export const fetchPosts = createAsyncThunk(
  "community/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await toast.promise(axiosInstance.get("/community"), {
        
        loading: "Fetching community posts...",
        success: "Posts loaded successfully!",
        error: "Failed to fetch posts",
      });
      console.log("Fetched posts:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch posts"
      );
    }
  }
);

// Add post
export const addPost = createAsyncThunk(
  "community/addPost",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axiosInstance.post("/community", payload),
        {
          loading: "Adding your post...",
          success: "Post added successfully!",
          error: "Failed to add post",
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add post"
      );
    }
  }
);

// Like post
export const likePost = createAsyncThunk(
  "community/likePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axiosInstance.post(`/community/${postId}/like`),
        {
          loading: "Liking post...",
          success: "Post liked successfully!",
          error: "Failed to like post",
        }
      );
      return { postId, likes: response.data.likes };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to like post"
      );
    }
  }
);

// Add comment
export const addComment = createAsyncThunk(
  "community/addComment",
  async ({ postId, text }, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axiosInstance.post(`/community/${postId}/comment`, { text }),
        {
          loading: "Adding comment...",
          success: "Comment added successfully!",
          error: "Failed to add comment",
        }
      );
      return { postId, comments: response.data.comments };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add comment"
      );
    }
  }
);

// Add answer
export const addAnswer = createAsyncThunk(
  "community/addAnswer",
  async ({ postId, text }, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axiosInstance.post(`/community/${postId}/answer`, { text }),
        {
          loading: "Adding answer...",
          success: "Answer added successfully!",
          error: "Failed to add answer",
        }
      );
      return { postId, answers: response.data.answers };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add answer"
      );
    }
  }
);

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addPost
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // likePost
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, likes } = action.payload;
        const post = state.posts.find((p) => p._id === postId);
        if (post) post.likes = likes;
      })

      // addComment
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        const post = state.posts.find((p) => p._id === postId);
        if (post) {
          post.comments = comments;
        }
      })

      // addAnswer
      .addCase(addAnswer.fulfilled, (state, action) => {
        const { postId, answers } = action.payload;
        const post = state.posts.find((p) => p._id === postId);
        if (post) {
          post.answers = answers;
        }
      });
  },
});

export default communitySlice.reducer;

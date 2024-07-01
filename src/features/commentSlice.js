import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk for fetching data
export const fetchCommentData = createAsyncThunk("CommentData/fetch", async () => {
  const response = await fetch(`http://localhost:8000/api/comment/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  return data;
});


// Async thunk for deleting data
export const deleteCommentData = createAsyncThunk("CommentData/delete", async (id) => {
  await fetch(`http://localhost:8000/api/comment/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return id;
});

const CommentSlice = createSlice({
  name: "CommentSlice",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCommentData.fulfilled, (state, action) => {
        console.log("Fetch response:", action.payload); // Log the response
        state.isLoading = false;
        state.data = action.payload.data; // Assuming the response contains a data field
      })
      .addCase(fetchCommentData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCommentData.fulfilled, (state, action) => {
        console.log("Delete response:", action.payload); // Log the response
        state.isLoading = false;
        state.data = state.data.filter((item) => item._id !== action.payload);
      });
  },
});

export default CommentSlice.reducer;

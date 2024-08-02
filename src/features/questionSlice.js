import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk for fetching data
export const fetchQuestionData = createAsyncThunk("QuestionData/fetch", async () => {
  const response = await fetch(`https://law-firm-backend-sigma.vercel.app/api/faq/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response.json();
});

// Async thunk for adding data
export const addQuestionData = createAsyncThunk("QuestionData/add", async (newData) => {
  const response = await fetch(`https://law-firm-backend-sigma.vercel.app/api/faq/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
    credentials: "include",
  });
  console.log("State", newData)
  return response.json();
});

// Async thunk for updating data
export const updateQuestionData = createAsyncThunk("QuestionData/update", async ({ id, formData }) => {
  const response = await fetch(`https://law-firm-backend-sigma.vercel.app/api/faq/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });
  return response.json();
});

// Async thunk for deleting data
export const deleteQuestionData = createAsyncThunk("QuestionData/delete", async (id) => {
  await fetch(`https://law-firm-backend-sigma.vercel.app/api/faq/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return id;
});

const questionSlice = createSlice({
  name: "questionSlice",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchQuestionData.fulfilled, (state, action) => {
        console.log("Fetch response:", action.payload); // Log the response
        state.isLoading = false;
        state.data = action.payload.data; // Assuming the response contains a data field
      })
      .addCase(fetchQuestionData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addQuestionData.fulfilled, (state, action) => {
        console.log("Add response:", action.payload); // Log the response
        state.isLoading = false;
        if (action.payload.data) {
          state.data.push(action.payload.data);
        }
      })
      .addCase(updateQuestionData.fulfilled, (state, action) => {
        console.log("Update response:", action.payload); // Log the response
        state.isLoading = false;
        const index = state.data.findIndex((item) => item._id === action.payload.data._id);
        if (index !== -1) {
          state.data[index] = action.payload.data;
        }
      })
      .addCase(deleteQuestionData.fulfilled, (state, action) => {
        console.log("Delete response:", action.payload); // Log the response
        state.isLoading = false;
        state.data = state.data.filter((item) => item._id !== action.payload);
      });
  },
});

export default questionSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk for fetching data
export const fetchConsultancyData = createAsyncThunk("ConsultancyData/fetch", async () => {
  const response = await fetch("https://law-firm-backend-sigma.vercel.app/api/request/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response.json();
});

// Async thunk for deleting data
export const deleteConsultancyData = createAsyncThunk("ConsultancyData/delete", async (id) => {
  await fetch( `https://law-firm-backend-sigma.vercel.app/api/request/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return id;
});

const ConsultancySlice = createSlice({
  name: "ConsultancySlice",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConsultancyData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchConsultancyData.fulfilled, (state, action) => {
        console.log("Fetch response:", action.payload); // Log the response
        state.isLoading = false;
        state.data = action.payload.data; // Assuming the response contains a data field
      })
      .addCase(fetchConsultancyData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteConsultancyData.fulfilled, (state, action) => {
        console.log("Delete response:", action.payload); // Log the response
        state.isLoading = false;
        state.data = state.data.filter((item) => item._id !== action.payload);
      });
  },
});

export default ConsultancySlice.reducer;

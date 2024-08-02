import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk for fetching Lawer data
export const fetchLawerData = createAsyncThunk("Lawer/fetchLawerData", async () => {
  const response = await fetch(`https://law-firm-backend-sigma.vercel.app/api/advocate/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response.json();
});

// Async thunk for adding a new Lawer
export const addLawerData = createAsyncThunk("Lawer/addLawer", async (formData) => {
  const response = await fetch( `https://law-firm-backend-sigma.vercel.app/api/advocate/add`, {
    method: 'POST',
    body: formData,
    credentials: "include",
  });
  return response.json();
});

// Async thunk for updating an existing Lawer
export const updateLawerData = createAsyncThunk("Lawer/updateLawer", async ({ id, formData }) => {
  const response = await fetch(`https://law-firm-backend-sigma.vercel.app/api/advocate/update/${id}`, {
    method: 'PUT',
    body: formData,
    credentials: "include",
  });
  return response.json();
});

// Async thunk for deleting an Lawer
export const deleteLawerData = createAsyncThunk("Lawer/deleteLawer", async (id) => {
  await fetch(`https://law-firm-backend-sigma.vercel.app/api/advocate/delete/${id}`, {
    method: 'DELETE',
    credentials: "include",
  });
  return id;
});

const LawerSlice = createSlice({
  name: "Lawer",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLawerData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLawerData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchLawerData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addLawerData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload.data);
      })
      .addCase(updateLawerData.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.findIndex(item => item._id === action.payload.data._id);
        if (index !== -1) {
          state.data[index] = action.payload.data;
        }
      })
      .addCase(deleteLawerData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter(item => item._id !== action.payload);
      });
  },
});

export default LawerSlice.reducer;

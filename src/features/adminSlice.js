import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk for fetching admin data
export const fetchAdminData = createAsyncThunk("admin/fetchAdminData", async () => {
  const response = await fetch('http://localhost:8000/api/admin/get', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response.json();
});

// Async thunk for adding a new admin
export const addAdmin = createAsyncThunk("admin/addAdmin", async (formData) => {
  const response = await fetch('http://localhost:8000/api/admin/add', {
    method: 'POST',
    body: formData,
    credentials: "include",
  });
  return response.json();
});

// Async thunk for updating an existing admin
export const updateAdmin = createAsyncThunk("admin/updateAdmin", async ({ id, formData }) => {
  const response = await fetch(`http://localhost:8000/api/admin/update/${id}`, {
    method: 'PUT',
    body: formData,
    credentials: "include",
  });
  return response.json();
});

// Async thunk for deleting an admin
export const deleteAdmin = createAsyncThunk("admin/deleteAdmin", async (id) => {
  await fetch(`http://localhost:8000/api/admin/delete/${id}`, {
    method: 'DELETE',
    credentials: "include",
  });
  return id;
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAdminData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload.data);
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.findIndex(item => item._id === action.payload.data._id);
        if (index !== -1) {
          state.data[index] = action.payload.data;
        }
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter(item => item._id !== action.payload);
      });
  },
});

export default adminSlice.reducer;

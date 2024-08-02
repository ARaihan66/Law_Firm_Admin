import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk for fetching data
export const fetchServiceData = createAsyncThunk("ServiceData/fetch", async () => {
  const response = await fetch(`https://law-firm-backend-sigma.vercel.app/api/practice/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  //console.log(response.json());
  return response.json();
});

// Async thunk for adding data
export const addServiceData = createAsyncThunk("ServiceData/add", async (formData) => {
  const response = await fetch(`https://law-firm-backend-sigma.vercel.app/api/practice/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });
  return response.json();
});

export const updateServiceData = createAsyncThunk("ServiceData/update", async ({ id, formData }) => {
  const response = await fetch(`https://law-firm-backend-sigma.vercel.app/api/practice/update/${id}`, {
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
export const deleteServiceData = createAsyncThunk("ServiceData/delete", async (id) => {
  await fetch(`https://law-firm-backend-sigma.vercel.app/api/practice/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return id;
});

const ServiceSlice = createSlice({
  name: "ServiceSlice",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchServiceData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data; // Assuming the response contains a data field
      })
      .addCase(fetchServiceData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addServiceData.fulfilled, (state, action) => {
        console.log("Add response:", action.payload); // Log the response
        state.isLoading = false;
        if (action.payload.data) {
          state.data.push(action.payload.data);
        }
      })
      .addCase(updateServiceData.fulfilled, (state, action) => {
        console.log("Update response:", action.payload); // Log the response
        state.isLoading = false;
        const index = state.data.findIndex((item) => item._id === action.payload.data._id);
        if (index !== -1) {
          state.data[index] = action.payload.data;
        }
      })
      .addCase(deleteServiceData.fulfilled, (state, action) => {
        console.log("Delete response:", action.payload); // Log the response
        state.isLoading = false;
        state.data = state.data.filter((item) => item._id !== action.payload);
      });
  },
});

export default ServiceSlice.reducer;

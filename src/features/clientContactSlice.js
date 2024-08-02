import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk for fetching data
export const fetchContactData = createAsyncThunk("ContactData/fetch", async () => {
  const response = await fetch( `https://law-firm-backend-sigma.vercel.app/api/contact/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response.json();
});

// Async thunk for deleting data
export const deleteContactData = createAsyncThunk("ContactData/delete", async (id) => {
  await fetch( `https://law-firm-backend-sigma.vercel.app/api/contact/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return id;
});

const ContactSlice = createSlice({
  name: "ContactSlice",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContactData.fulfilled, (state, action) => {
        console.log("Fetch response:", action.payload); // Log the response
        state.isLoading = false;
        state.data = action.payload.data; // Assuming the response contains a data field
      })
      .addCase(fetchContactData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteContactData.fulfilled, (state, action) => {
        console.log("Delete response:", action.payload); // Log the response
        state.isLoading = false;
        state.data = state.data.filter((item) => item._id !== action.payload);
      });
  },
});

export default ContactSlice.reducer;

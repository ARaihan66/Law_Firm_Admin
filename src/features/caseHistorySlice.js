import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCaseData = createAsyncThunk("case/fetch", async () => {
  const response = await fetch(`https://law-firm-backend-sigma.vercel.app/api/case/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data;
});

export const addCaseData = createAsyncThunk('case/add', async (formData) => {
  const response = await fetch(`https://law-firm-backend-sigma.vercel.app/api/case/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData),
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Failed to add data");
  }

  const data = await response.json();
  return data;
});

export const updateCaseData = createAsyncThunk("case/update", async ({ id, formData }) => {
  const response = await fetch(`https://law-firm-backend-sigma.vercel.app/api/case/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData),
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Failed to update data");
  }

  const data = await response.json();
  return data;
});

export const deleteCaseData = createAsyncThunk("case/delete", async (id) => {
  const response = await fetch(`https://law-firm-backend-sigma.vercel.app/api/case/delete/${id}`, {
    method: "DELETE",
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Failed to delete data");
  }

  return id;
});

const caseSlice = createSlice({
  name: "caseSlice",
  initialState: {
    data: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaseData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCaseData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchCaseData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addCaseData.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.data) {
          state.data.push(action.payload.data);
        }
      })
      .addCase(updateCaseData.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        const index = state.data.findIndex((item) => item._id === action.payload.data._id);
        if (index !== -1) {
          state.data[index] = action.payload.data;
        }
      })
      .addCase(deleteCaseData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((item) => item._id !== action.payload);
      });
  },
});

export default caseSlice.reducer;

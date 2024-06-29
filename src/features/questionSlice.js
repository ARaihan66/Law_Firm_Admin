import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchData = createAsyncThunk("data/fetch", async () => {
  const response = await fetch("http://localhost:8000/api/faq/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response.json();
});


const addData = createAsyncThunk("data/add", async(newData)=>{
    const response = await fetch("",{
        method:"POST",
        body: newData,
        credentials:"include"
    })

    return response.json();
})


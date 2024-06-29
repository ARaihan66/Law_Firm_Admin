import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "../features/adminSlice";


export const store = configureStore({
    reducer:{
        admin : adminSlice
    }
})
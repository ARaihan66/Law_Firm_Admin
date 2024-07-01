import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "../features/adminSlice";
import questionSlice from "../features/questionSlice";
import caseHistorySlice from "../features/caseHistorySlice";
import lawerSlice from "../features/lawerSlice";
import serviceSlice from "../features/serviceSlice";
import commentSlice from "../features/commentSlice";
import consultancySlice from "../features/consultancySlice";
import clientContactSlice from "../features/clientContactSlice";


export const store = configureStore({
    reducer:{
        admin : adminSlice,
        question : questionSlice,
        case: caseHistorySlice,
        lawer: lawerSlice,
        service : serviceSlice,
        comment:commentSlice,
        consultancy:consultancySlice,
        contact:clientContactSlice
    }
})
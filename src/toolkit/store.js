import { configureStore } from "@reduxjs/toolkit";
import BookSlice from "./slices/BookSlice";
import UserSlice from "./slices/UserSlice";


export const store = configureStore({
    reducer : {
        book : BookSlice,
        user : UserSlice
    },
})
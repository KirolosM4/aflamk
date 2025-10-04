import { configureStore } from "@reduxjs/toolkit";
import { HomeRedu } from "./Slices/HomeSlice";

const Store = configureStore({
    reducer : {
        HomeRedu
    }
})

export default Store;
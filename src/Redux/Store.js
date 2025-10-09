import { configureStore } from "@reduxjs/toolkit";
import { HomeRedu } from "./Slices/HomeSlice";
import {MoviesRed} from  "./Slices/MoviesSlice";
const Store = configureStore({
    reducer : {
        HomeRedu,
        MoviesRed
    }
})

export default Store;
import { configureStore } from "@reduxjs/toolkit";
import { HomeRedu } from "./Slices/HomeSlice";
import {MoviesRed} from  "./Slices/MoviesSlice";
import { SeriesRed } from "./Slices/SeriesSlice";
import { movieDetails } from "./Slices/DetailsMovieSlice";
const Store = configureStore({
    reducer : {
        HomeRedu,
        MoviesRed,
        SeriesRed,
        movieDetails,
    }
})

export default Store;
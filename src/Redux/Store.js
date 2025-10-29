import { configureStore } from "@reduxjs/toolkit";
import { HomeRedu } from "./Slices/HomeSlice";
import {MoviesRed} from  "./Slices/MoviesSlice";
import { SeriesRed } from "./Slices/SeriesSlice";
import { movieDetails } from "./Slices/DetailsMovieSlice";
import { seriesDetails } from "./Slices/DetailsSeriesSlice";
const Store = configureStore({
    reducer : {
        HomeRedu,
        MoviesRed,
        SeriesRed,
        movieDetails,
        seriesDetails,
    }
})

export default Store;
import { configureStore } from "@reduxjs/toolkit";
import { HomeRedu } from "./Slices/HomeSlice";
import {MoviesRed} from  "./Slices/MoviesSlice";
import { SeriesRed } from "./Slices/SeriesSlice";
import { movieDetails } from "./Slices/DetailsMovieSlice";
import { seriesDetails } from "./Slices/DetailsSeriesSlice";
import { ReviewsData } from "./Slices/ReviewsSlice";
import { mediaRedu } from "./Slices/MediaSlice";
import { ReviewsDataSeries } from "./Slices/ReviewSeriesSlice";
import { mediaSeriesRedu } from "./Slices/MediaSeriesSlice";
import { searchData } from "./Slices/SearchSlice";
import { personDetailsData } from "./Slices/PersonDetails";
const Store = configureStore({
    reducer : {
        HomeRedu,
        MoviesRed,
        SeriesRed,
        movieDetails,
        seriesDetails,
        ReviewsData,
        mediaRedu,
        ReviewsDataSeries,
        mediaSeriesRedu,
        searchData,
        personDetailsData,

    }
})

export default Store;
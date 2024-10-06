import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { myMovies } from "./Slice/MoviesCarousalSlice";
import { mySeries } from "./Slice/SeriesCarousalSlice";
import { myTopMovies } from "./Slice/TopMoviesSlice";
import { myTopSeries } from "./Slice/TopSeriesSlice";
const AllRed = combineReducers({
    myMovies,
    mySeries,
    myTopMovies,
    myTopSeries,
})

const Store = configureStore({
    reducer:AllRed
})

export default Store;
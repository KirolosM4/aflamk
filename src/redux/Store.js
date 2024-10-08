import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { myMovies } from "./Slice/MoviesCarousalSlice";
import { mySeries } from "./Slice/SeriesCarousalSlice";
import { myTopMovies } from "./Slice/TopMoviesSlice";
import { myTopSeries } from "./Slice/TopSeriesSlice";
import { myAllMovies } from "./Slice/allMoviesSlice";
import { myAllSeries } from "./Slice/AllSeriesSlice";
const AllRed = combineReducers({
    myMovies,
    mySeries,
    myTopMovies,
    myTopSeries,
    myAllMovies,
    myAllSeries,
})

const Store = configureStore({
    reducer:AllRed
})

export default Store;
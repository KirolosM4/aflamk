import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { myMovies } from "./Slice/MoviesCarousalSlice";
import { mySeries } from "./Slice/SeriesCarousalSlice";
import { myTopMovies } from "./Slice/TopMoviesSlice";
const AllRed = combineReducers({
    myMovies,
    mySeries,
    myTopMovies,
})

const Store = configureStore({
    reducer:AllRed
})

export default Store;
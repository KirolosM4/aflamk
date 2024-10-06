import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { myMovies } from "./Slice/MoviesCarousalSlice";
import { mySeries } from "./Slice/SeriesCarousalSlice";
const AllRed = combineReducers({
    myMovies,
    mySeries,
})

const Store = configureStore({
    reducer:AllRed
})

export default Store;
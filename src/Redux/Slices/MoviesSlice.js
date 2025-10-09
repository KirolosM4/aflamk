import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getMovies = createAsyncThunk("/getMovies",async (numberPagination,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI
    try {
        const {data}  = await axios({
            method:"get",
            url: 'https://api.themoviedb.org/3/movie/popular',
            params: {language: 'en-US', page: numberPagination},
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MDcwOS41NDEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLDzvE3JjpnDnXJp65L2ww7pclm633QVmw5K1JssZEY'
            }
        })
        return data;
    } catch (error) {
        return rejectWithValue(error)
    }
})

const initialState = {
    loadingMovies:false,
    movies:[],
    errorMovies:false
}

const MoviesSlice = createSlice({
    name:"/MoviesSlice",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getMovies.pending,(state,{payload})=>{
            state.loadingMovies = true;
        });
        builder.addCase(getMovies.fulfilled,(state,{payload})=>{
            state.movies = payload.results;
            state.loadingMovies = false;
            state.errorMovies = false;
        });
        builder.addCase(getMovies.rejected,(state,{payload})=>{
            state.errorMovies = true;
        })
    }
})

export const MoviesRed = MoviesSlice.reducer;
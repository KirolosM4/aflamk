import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getNowPlayingMovie = createAsyncThunk("/getNowPlayingMovie", async (x,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const {data} = await axios({
            method:"get",
            url: 'https://api.themoviedb.org/3/movie/now_playing',
            params: {language: 'en-US', page: '1'},
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
    nowPlayingMovie:[],
    loadingNowPlayingMovie:false,
}

const HomeSlice = createSlice({
    name:"/HomeSlice",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getNowPlayingMovie.pending,(state,{payload})=>{
            state.loadingNowPlayingMovie = true;
        })
        builder.addCase(getNowPlayingMovie.fulfilled,(state,{payload})=>{
            state.loadingNowPlayingMovie = false;
            state.nowPlayingMovie = payload.results;
        })
        builder.addCase(getNowPlayingMovie.rejected,(state,{payload})=>{
            console.log("rej")
        })
    }
})

export const HomeRedu = HomeSlice.reducer;
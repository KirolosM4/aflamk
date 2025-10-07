import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// function get now playing movies 
export const getNowPlayingMovies = createAsyncThunk("/getNowPlayingMovies", async (x,thunkAPI)=>{
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

// function get now playing series 
export const getNowPlayingSeries = createAsyncThunk("/getNowPlayingSeries",async(x,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const {data} = await axios({
            method:"get",
            url: 'https://api.themoviedb.org/3/tv/popular',
            params: {language: 'en-US', page: '1'},
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MDcwOS41NDEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLDzvE3JjpnDnXJp65L2ww7pclm633QVmw5K1JssZEY'
            }
        })

        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
})
// function for getTopMovies
export const getTopMovies = createAsyncThunk("getTopMovies",async (x,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const {data} = await axios({
            method:"get",
            url: 'https://api.themoviedb.org/3/movie/top_rated',
            params: {language: 'en-US', page: '1'},
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MDcwOS41NDEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLDzvE3JjpnDnXJp65L2ww7pclm633QVmw5K1JssZEY'
            }
        })
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
})
// function for getTopSeries
export const getTopSeries = createAsyncThunk("getTopSeries",async (x,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const {data} = await axios({
            method:"get",
            url: 'https://api.themoviedb.org/3/tv/top_rated',
            params: {language: 'en-US', page: '1'},
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MDcwOS41NDEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLDzvE3JjpnDnXJp65L2ww7pclm633QVmw5K1JssZEY'
            }
        })
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
})


const initialState = {
    nowPlayingMovies:[],
    loadingNowPlayingMovies:false,
    errNowPlayingMovies:false,
    nowPlayingSeries:[],
    loadingNowPlayingSeries:false,
    errNowPlayingSeries:false,
    topMovies:[],
    loadingTopMovies:false,
    errorTopMovies:false,
    topSeries:[],
    loadingTopSeries:false,
    errorTopSeries:false,
}

const HomeSlice = createSlice({
    name:"/HomeSlice",
    initialState,
    extraReducers:(builder)=>{
        // builder for getNowPlayingMovies
        builder.addCase(getNowPlayingMovies.pending,(state,{payload})=>{
            state.loadingNowPlayingMovies = true;
        });
        builder.addCase(getNowPlayingMovies.fulfilled,(state,{payload})=>{
            state.nowPlayingMovies = payload.results;
            state.loadingNowPlayingMovies = false;
            state.errNowPlayingMovies = false;
        });
        builder.addCase(getNowPlayingMovies.rejected,(state,{payload})=>{
            state.errNowPlayingMovies = true;
            state.loadingNowPlayingMovies = false;
        });
        // builder fro getNowPlayingSeries
        builder.addCase(getNowPlayingSeries.pending,(state,{payload})=>{
            state.loadingNowPlayingSeries = true;
        });
        builder.addCase(getNowPlayingSeries.fulfilled,(state,{payload})=>{
            state.nowPlayingSeries = payload.results;
            state.loadingNowPlayingSeries = false;
            state.errNowPlayingSeries = false;
        });
        builder.addCase(getNowPlayingSeries.rejected,(state,{payload})=>{
            state.errNowPlayingSeries = true;
            state.loadingNowPlayingSeries = false;
        });
        // builder for getTopMovies
        builder.addCase(getTopMovies.pending,(state,{payload})=>{
            state.loadingTopMovies = true;
        }) 
        builder.addCase(getTopMovies.fulfilled,(state,{payload})=>{
            state.topMovies = payload.results;
            state.loadingTopMovies = false;
            state.errorTopMovies = false;
        }) 
        builder.addCase(getTopMovies.rejected,(state,{payload})=>{
            state.loadingTopMovies = false;
            state.errorTopMovies = true;
        }) 
        // builder for getTopSeries
        builder.addCase(getTopSeries.pending,(state,{payload})=>{
            state.loadingTopSeries = true;
        }) 
        builder.addCase(getTopSeries.fulfilled,(state,{payload})=>{
            state.topSeries = payload.results;
            state.loadingTopSeries = false;
            state.errorTopSeries = false;
        }) 
        builder.addCase(getTopSeries.rejected,(state,{payload})=>{
            state.loadingTopSeries = false;
            state.errorTopSeries = true;
        }) 
    }
})

export const HomeRedu = HomeSlice.reducer;
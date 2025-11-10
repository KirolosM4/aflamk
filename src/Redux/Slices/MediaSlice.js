import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getMedia = createAsyncThunk("/getMedia",async(movieId,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const {data} = await axios({
            method:"get",
            url: `https://api.themoviedb.org/3/movie/${movieId}/images`,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MDcwOS41NDEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLDzvE3JjpnDnXJp65L2ww7pclm633QVmw5K1JssZEY'
            }
        })
        return data;
    } catch (e) {
        return rejectWithValue(e);
    }
})

export const getVideos = createAsyncThunk("/getVideos",async(movieId,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const {data} = await axios({
            method:"get",
            url: `https://api.themoviedb.org/3/movie/${movieId}/videos`,
            params: {language: 'en-US'},
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MDcwOS41NDEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLDzvE3JjpnDnXJp65L2ww7pclm633QVmw5K1JssZEY'
            }
        })
        return data;
    } catch (e) {
        return rejectWithValue(e);
    }
})


const initialState = {
    loadingMedia:false,
    errMedia:false,
    media:{},
    videos:[],
    loadingVideo:false,
    errVideo:false
}

const MediaSlice = createSlice({
    name:"/mediaSlice",
    initialState,
    extraReducers:(builder)=>{
        // get poster and backdrops 
        builder.addCase(getMedia.pending,(state,{payload})=>{
            state.loadingMedia = true;
        })
        builder.addCase(getMedia.fulfilled,(state,{payload})=>{
            state.media = payload;
            state.loadingMedia = false;
            state.errMedia = false;
        })
        builder.addCase(getMedia.rejected,(state,{payload})=>{
            state.loadingMedia = false;
            state.errMedia = true;
        })
        // get videos 
        builder.addCase(getVideos.pending,(state,{payload})=>{
            state.loadingVideo = true;
        })
        builder.addCase(getVideos.fulfilled,(state,{payload})=>{
            state.videos = payload.results;
            state.loadingVideo = false;
            state.errVideo = false;
        })
        builder.addCase(getVideos.rejected,(state,{payload})=>{
            state.loadingVideo = false;
            state.errVideo = true;
        })

    }
})

export const mediaRedu = MediaSlice.reducer;
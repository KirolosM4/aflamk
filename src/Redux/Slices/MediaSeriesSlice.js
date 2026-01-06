import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getMediaSeries = createAsyncThunk("/getMediaSeries",async(seriesId,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const {data} = await axios({
            method:"get",
            url: `https://api.themoviedb.org/3/tv/${seriesId}/images`,
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

export const getVideosSeries = createAsyncThunk("/getVideosSeries",async(seriesId,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const {data} = await axios({
            method:"get",
            url: `https://api.themoviedb.org/3/tv/${seriesId}/videos`,
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
    mediaSeries:{},
    videosSeries:[],
    loadingVideo:false,
    errVideo:false
}

const MediaSeriesSlice = createSlice({
    name:"/MediaSeriesSlice",
    initialState,
    extraReducers:(builder)=>{
        // get poster and backdrops 
        builder.addCase(getMediaSeries.pending,(state,{payload})=>{
            state.loadingMedia = true;
        })
        builder.addCase(getMediaSeries.fulfilled,(state,{payload})=>{
            state.mediaSeries = payload;
            state.loadingMedia = false;
            state.errMedia = false;
        })
        builder.addCase(getMediaSeries.rejected,(state,{payload})=>{
            state.loadingMedia = false;
            state.errMedia = true;
        })
        // get videos 
        builder.addCase(getVideosSeries.pending,(state,{payload})=>{
            state.loadingVideo = true;
        })
        builder.addCase(getVideosSeries.fulfilled,(state,{payload})=>{
            state.videosSeries = payload.results;
            state.loadingVideo = false;
            state.errVideo = false;
        })
        builder.addCase(getVideosSeries.rejected,(state,{payload})=>{
            state.loadingVideo = false;
            state.errVideo = true;
        })

    }
})

export const mediaSeriesRedu = MediaSeriesSlice.reducer;
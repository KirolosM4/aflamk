import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getSeries = createAsyncThunk("/getSeries",async (numberPagination,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI
    try {
        const {data}  = await axios({
            method:"get",
            url: 'https://api.themoviedb.org/3/tv/popular',
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
    loadingSeries:false,
    series:[],
    errorSeries:false
}

const SeriesSlice = createSlice({
    name:"/SeriesSlice",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getSeries.pending,(state,{payload})=>{
            state.loadingSeries = true;
        });
        builder.addCase(getSeries.fulfilled,(state,{payload})=>{
            state.series = payload.results;
            state.loadingSeries = false;
            state.errorSeries = false;
        });
        builder.addCase(getSeries.rejected,(state,{payload})=>{
            state.errorSeries = true;
        })
    }
})

export const SeriesRed = SeriesSlice.reducer;
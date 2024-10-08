import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
export const getTopSeries = createAsyncThunk("getTopSeries",async(x,ThunkAPI)=>{
    const {rejectWithValue} = ThunkAPI;
    try {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/tv/top_rated',
            params: {language: 'en-US', page: '1'},
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODIwNTIyNC44NjE3NjYsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z4X5_ABx-m_YfD2ED8Sf7juxXY-Caucjxzaoa7TRjCw'
            }
          };
          
          const res = await axios
            .request(options)
            .then(function (response) {
              return response.data
            })
            return res;
    } catch(error){
        return rejectWithValue(error)
    }
})

const initialState = {
    topSeries : []
}

const TopSeriesSlice = createSlice({
    name:"TopSeriesSlice",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getTopSeries.pending,()=>{
            console.log("pending")
        });
        builder.addCase(getTopSeries.fulfilled,(state,{type,payload:{results}})=>{
            if(type.includes("TopSeries")){
                results.length = 12;
                state.topSeries = results;
            }
        })
        builder.addCase(getTopSeries.rejected,(state,{payload})=>{
            console.log("rej")
        })
    }
})

export const myTopSeries = TopSeriesSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
export const getSeries = createAsyncThunk("getSeries",async(x,ThunkAPI)=>{
    const {rejectWithValue} = ThunkAPI;
    try {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/tv/airing_today',
            params: {language: 'en-US', page: '1'},
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MTA4OC4yNzA3NzEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NW-zn59PKHgXZzhpEV_vqzkHixTJy2LP51USl1q2rGs'
            }
          };
          
          const res = await axios
            .request(options)
            .then(function (response) {
              return response.data;
            })
            
            return res;
    } catch(error){
        return rejectWithValue(error)
    }
})

const initialState = {
    series : []
}

const SeriesCarousalSlice = createSlice({
    name:"SeriesCarousalSlice",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getSeries.pending,()=>{
            console.log("pending")
        });
        builder.addCase(getSeries.fulfilled,(state,{type,payload:{results}})=>{
            if(type.includes("Series")){
                state.series = results;
            }
        })
        builder.addCase(getSeries.rejected,(state,{payload})=>{
            console.log("rej")
        })
    }
})

export const mySeries = SeriesCarousalSlice.reducer;
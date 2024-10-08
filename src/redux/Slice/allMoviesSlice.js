import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getAllMovies = createAsyncThunk("getAllMovies",async(active,ThunkAPI)=>{
    const {rejectWithValue} = ThunkAPI;
    try {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/popular',
            params: {language: 'en-US', page: active},
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODIwNTIyNC44NjE3NjYsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z4X5_ABx-m_YfD2ED8Sf7juxXY-Caucjxzaoa7TRjCw'
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
    allMovies : [],
    waitingMovie:true,
    active:1,
}

const AllMoviesSlice = createSlice({
    name:"AllMoviesSlice",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getAllMovies.pending,(state)=>{
            state.waitingMovie = true;
        });
        builder.addCase(getAllMovies.fulfilled,(state,{type,payload:{results}})=>{
                state.allMovies = results;
                state.waitingMovie = false;
        })
        builder.addCase(getAllMovies.rejected,(state,{payload})=>{
            console.log("rej")
        })
    },
    reducers:{
        next : (state) => {
            if (state.active === 500)
              return;
               state.active += 1;
          },
        prev : (state) => {
            if (state.active === 1) 
              return;
              state.active -= 1;
          },
        resetNext : (state) => {
            state.active = 1;
        },
        resetPrev : (state) => {
            state.active = 500;
        },
    }
})

export const myAllMovies = AllMoviesSlice.reducer;
export const {next,prev,resetNext,resetPrev} = AllMoviesSlice.actions;
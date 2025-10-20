    import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
    import axios from "axios";

    export const getDetilsMovie = createAsyncThunk("/getDetailsMovie",async(movieId,thunkAPI)=>{
        const {rejectWithValue} = thunkAPI;
        try {
            const {data} = await axios({
                method:"get",
                url: `https://api.themoviedb.org/3/movie/${movieId}`,
                params: {language: 'en-US'},
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MDcwOS41NDEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLDzvE3JjpnDnXJp65L2ww7pclm633QVmw5K1JssZEY'
                }
            })
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    });

    export const getCreditsMovie = createAsyncThunk("/getCreditsMovies",async(movieId,thunkAPI)=>{
        const {rejectWithValue} = thunkAPI;
        try {
            const {data} = await axios({
                method:"get",
                url: `https://api.themoviedb.org/3/movie/${movieId}/credits`,
                params: {language: 'en-US'},
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
        detailsMovie:{},
        loadingMovieDetails:false,
        errMovieDetails:false,
        creditMovie:{},
        loadingCredit:false,
        errCredit:false,
    }

    const DetailsMovieSlice = createSlice({
        name:"/DetailsMovieSlice",
        initialState,
        extraReducers:(builder)=>{
            // get details movies 
            builder.addCase(getDetilsMovie.pending,(state,{payload})=>{
                state.loadingMovieDetails = true;
            });
            builder.addCase(getDetilsMovie.fulfilled,(state,{payload})=>{
                state.detailsMovie = payload;
                state.loadingMovieDetails = false;
                state.errMovieDetails = false;
            });
            builder.addCase(getDetilsMovie.rejected,(state,{payload})=>{
                state.loadingMovieDetails = false;
                state.errMovieDetails = true;
            });
            // get credits movie
            builder.addCase(getCreditsMovie.pending,(state,{payload})=>{
                state.loadingCredit = true;
            })
            builder.addCase(getCreditsMovie.fulfilled,(state,{payload})=>{
                state.creditMovie = payload;
                state.loadingCredit = false;
                state.errCredit = false;
            })
            builder.addCase(getCreditsMovie.rejected,(state,{payload})=>{
                state.errCredit = true;
                state.loadingCredit = false;
            })
        }
    })


    export const movieDetails = DetailsMovieSlice.reducer;
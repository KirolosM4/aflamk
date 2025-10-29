    import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
    import axios from "axios";

    export const getDetailsSeries = createAsyncThunk("/getDetailsSeries",async(seriesId,thunkAPI)=>{
        const {rejectWithValue} = thunkAPI;
        try {
            const {data} = await axios({
                method:"get",
                url: `https://api.themoviedb.org/3/tv/${seriesId}`,
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

    export const getCreditsSeries = createAsyncThunk("/getCreditsSeries",async(seriesId,thunkAPI)=>{
        const {rejectWithValue} = thunkAPI;
        try {
            const {data} = await axios({
                method:"get",
                url: `https://api.themoviedb.org/3/tv/${seriesId}/credits`,
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
        detailsSeries:{},
        loadingSeriesDetails:false,
        errSeriesDetails:false,
        creditSeries:{},
        loadingCredit:false,
        errCredit:false,
    }

    const DetailsSeriesSlice = createSlice({
        name:"/DetailsSeriesSlice",
        initialState,
        extraReducers:(builder)=>{
            // get details movies 
            builder.addCase(getDetailsSeries.pending,(state,{payload})=>{
                state.loadingSeriesDetails = true;
            });
            builder.addCase(getDetailsSeries.fulfilled,(state,{payload})=>{
                state.detailsSeries = payload;
                state.loadingSeriesDetails = false;
                state.errSeriesDetails = false;
            });
            builder.addCase(getDetailsSeries.rejected,(state,{payload})=>{
                state.loadingSeriesDetails = false;
                state.errSeriesDetails = true;
            });
            // get credits movie
            builder.addCase(getCreditsSeries.pending,(state,{payload})=>{
                state.loadingCredit = true;
            })
            builder.addCase(getCreditsSeries.fulfilled,(state,{payload})=>{
                state.creditSeries = payload;
                state.loadingCredit = false;
                state.errCredit = false;
            })
            builder.addCase(getCreditsSeries.rejected,(state,{payload})=>{
                state.errCredit = true;
                state.loadingCredit = false;
            })
        }
    })


    export const seriesDetails = DetailsSeriesSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    reviews : [],
    loadingReviews : false,
    errReviews:false,
}

export const getReviewsSeries = createAsyncThunk("/getReviewsSeries",async(seriesId,thunkAPI)=>{

    const {rejectWithValue} = thunkAPI;
    try {
        const {data} = await axios({
            method:"get",
            url: `https://api.themoviedb.org/3/tv/${seriesId}/reviews`,
            params: {language: 'en-US', page: '1'},
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


const ReviewsSliceSeries = createSlice({
    name:"ReviewsSliceSeries",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getReviewsSeries.pending,(state,{payload})=>{
            state.loadingReviews = true;
        });
        builder.addCase(getReviewsSeries.fulfilled,(state,{payload})=>{
            state.reviews = payload.results;
            state.loadingReviews = false;
            state.errReviews = false;
        });
        builder.addCase(getReviewsSeries.rejected,(state,{payload})=>{
            state.loadingReviews = false;
            state.errReviews = true;
        });
    }
})

export const ReviewsDataSeries = ReviewsSliceSeries.reducer;
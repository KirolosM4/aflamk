import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    reviews : [],
    loadingReviews : false,
    errReviews:false,
}

export const getReviews = createAsyncThunk("/getReviews",async(movieId,thunkAPI)=>{

    const {rejectWithValue} = thunkAPI;
    try {
        const {data} = await axios({
            method:"get",
            url: `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
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


const ReviewsSlice = createSlice({
    name:"ReviewsSlice",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getReviews.pending,(state,{payload})=>{
            state.loadingReviews = true;
        });
        builder.addCase(getReviews.fulfilled,(state,{payload})=>{
            state.reviews = payload.results;
            console.log(state.reviews)
            state.loadingReviews = false;
            state.errReviews = false;
        });
        builder.addCase(getReviews.rejected,(state,{payload})=>{
            state.loadingReviews = false;
            state.errReviews = true;
        });
    }
})

export const ReviewsData = ReviewsSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    searchList : [],
}

export const getSearch = createAsyncThunk("/getSearch",async([word,typeSearch],thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const {data} = await axios({
            method:"get",
            url : typeSearch == "movies" ? 'https://api.themoviedb.org/3/search/movie' : 'https://api.themoviedb.org/3/search/tv',
            params: {query: word, include_adult: 'false', language: 'en-US', page: '1'},
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


const SearchSlice = createSlice({
    name:"SearchSlice",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getSearch.pending,(state,{payload})=>{
        });
        builder.addCase(getSearch.fulfilled,(state,{payload})=>{
            state.searchList = payload.results;
        });
        builder.addCase(getSearch.rejected,(state,{payload})=>{
        });
    }
})

export const searchData = SearchSlice.reducer;
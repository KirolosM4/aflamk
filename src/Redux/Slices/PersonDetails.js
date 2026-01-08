import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    personDetails : {},
    loadingDetailsPerson : false,
    errDetailsPerson:false,
}

export const getPersonDetails = createAsyncThunk("/getPersonDetails",async(personId,thunkAPI)=>{

    const {rejectWithValue} = thunkAPI;
    try {
        const {data} = await axios({
            method:"get",
            url: `https://api.themoviedb.org/3/person/${personId}`,
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


const PersonDetails = createSlice({
    name:"PersonDetails",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getPersonDetails.pending,(state,{payload})=>{
            state.loadingDetailsPerson = true;
        });
        builder.addCase(getPersonDetails.fulfilled,(state,{payload})=>{
            state.personDetails = payload;
            state.loadingDetailsPerson = false;
            state.errDetailsPerson = false;
        });
        builder.addCase(getPersonDetails.rejected,(state,{payload})=>{
            state.loadingDetailsPerson = false;
            state.errDetailsPerson = true;
        });
    }
})

export const personDetailsData = PersonDetails.reducer;
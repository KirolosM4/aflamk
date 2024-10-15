import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSearch = createAsyncThunk(
  "getSearch",
  async (query, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1",
        params: { language: "en-US", query, page: 1 },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODIwNTIyNC44NjE3NjYsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z4X5_ABx-m_YfD2ED8Sf7juxXY-Caucjxzaoa7TRjCw",
        },
      };

      const res = await axios.request(options);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//=============================================search series=====================================================
export const getSearchSeries = createAsyncThunk(
  "getSearchSeries",
  async (query, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/search/tv?include_adult=false&language=en-US&page=1",
        params: { language: "en-US", query, page: 1 },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODIwNTIyNC44NjE3NjYsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z4X5_ABx-m_YfD2ED8Sf7juxXY-Caucjxzaoa7TRjCw",
        },
      };

      const res = await axios.request(options);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  searchMovies: [],
  loading: false,
  error: null,
  searchSeries: [],
};

const SearchSlice = createSlice({
  name: "search",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getSearch.pending, (state) => {
      state.loading = true;
      state.searchMovies = [];
      state.error = null;
    });
    builder.addCase(getSearch.fulfilled, (state, action) => {
      state.loading = false;
      state.searchMovies = action.payload.results || [];
    });
    builder.addCase(getSearch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "error for data";
    });
    //=====================================================builder series==============================================
    builder.addCase(getSearchSeries.pending, (state) => {
      state.loading = true;
      state.searchSeries = [];
      state.error = null;
    });
    builder.addCase(getSearchSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.searchSeries = action.payload.results || [];
    });
    builder.addCase(getSearchSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "error for data";
    });
  },
});

export const mySearch = SearchSlice.reducer;

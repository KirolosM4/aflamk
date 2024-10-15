import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// الحصول على جميع المسلسلات
export const getAllSeries = createAsyncThunk(
  "getAllSeries",
  async (active, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/tv/popular",
        params: { language: "en-US", page: active },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODIwNTIyNC44NjE3NjYsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z4X5_ABx-m_YfD2ED8Sf7juxXY-Caucjxzaoa7TRjCw",
        },
      };

      const res = await axios.request(options);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // التعامل مع الأخطاء
    }
  }
);

// الحصول على تفاصيل مسلسل معين
export const getSeriesDetails = createAsyncThunk(
    "getSeriesDetails",
    async (seriesId, ThunkAPI) => {  // تأكد أن المعرف يتم تمريره هنا مباشرة
      const { rejectWithValue } = ThunkAPI;
      try {
        const options = {
          method: "GET",
          url: `https://api.themoviedb.org/3/tv/${seriesId}?language=en-US`, // استخدام seriesId مباشرة هنا
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODIwNTIyNC44NjE3NjYsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z4X5_ABx-m_YfD2ED8Sf7juxXY-Caucjxzaoa7TRjCw"
          },
        };
        const res = await axios.request(options);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data);
      }
    }
  );
  

const initialState = {
  allSeries: [],
  waitingSeries: true,
  active: 1,
  //=======================================initialstate details===========================================
  detailsSeries: [],
  loading: null,
  error: null,
};

const AllSeriesSlice = createSlice({
  name: "AllSeriesSlice",
  initialState,
  extraReducers: (builder) => {
    // للحصول على جميع المسلسلات
    builder.addCase(getAllSeries.pending, (state) => {
      state.waitingSeries = true;
    });
    builder.addCase(getAllSeries.fulfilled, (state, { payload }) => {
      state.allSeries = payload.results;
      state.waitingSeries = false;
    });
    builder.addCase(getAllSeries.rejected, (state, { payload }) => {
      console.log("رفض الطلب:", payload);
      state.waitingSeries = false;
    });

    // للحصول على تفاصيل المسلسل
    builder.addCase(getSeriesDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSeriesDetails.fulfilled, (state, { payload }) => {
      state.detailsSeries = payload;
      state.loading = false;
    });
    builder.addCase(getSeriesDetails.rejected, (state, { payload }) => {
      state.error = payload || "حدث خطأ أثناء جلب تفاصيل المسلسل";
      state.loading = false;
    });
  },
  reducers: {
    next: (state) => {
      if (state.active === 500) return;
      state.active += 1;
    },
    prev: (state) => {
      if (state.active === 1) return;
      state.active -= 1;
    },
    resetNext: (state) => {
      state.active = 1;
    },
    resetPrev: (state) => {
      state.active = 500;
    },
  },
});

export const myAllSeries = AllSeriesSlice.reducer;
export const { next, prev, resetNext, resetPrev } = AllSeriesSlice.actions;

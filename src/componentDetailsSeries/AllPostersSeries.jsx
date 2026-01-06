import React, { useEffect } from "react";
import HeaderMediaSeries from "./HeaderMediaSeries";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMediaSeries } from "../Redux/Slices/MediaSeriesSlice";

const AllPostersSeries = () => {
    const {seriesId} = useParams();
    const {mediaSeries:{posters}} = useSelector(reducer=>reducer.mediaSeriesRedu);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getMediaSeries(seriesId));
    },[seriesId]);

    return(
        <div className="bg-black">
            <HeaderMediaSeries/>
            <p className="text-2xl p-3 text-[#0DCAF0] font-bold text-center md:text-left md:p-11" >Social</p>
            <div className="bg-[#212529] grid grid-cols-1 gap-7 p-7 mx-11 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                {
                    posters?.map(({file_path})=>(
                        <img className="h-full w-full" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${file_path}`} alt="" />
                    ))
                }
            </div>
        </div>
    )
}

export default AllPostersSeries;
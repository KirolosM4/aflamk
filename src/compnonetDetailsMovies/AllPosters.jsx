import React, { useEffect } from "react";
import HeaderMedia from "./HeaderMedia";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {getMedia} from "../Redux/Slices/MediaSlice";

const AllPosters = () => {
    const {movieId} = useParams();
    const {media:{posters}} = useSelector(reducer=>reducer.mediaRedu);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getMedia(movieId));
    },[movieId]);

    return(
        <div className="bg-black">
            <HeaderMedia/>
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

export default AllPosters;
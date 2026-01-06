import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getDetailsSeries } from "../Redux/Slices/DetailsSeriesSlice";
import ErrorGetData from "../component/ErrorGetData"
import { IoStar } from "react-icons/io5";

const LastSeason = () => {
    const navigate = useNavigate();
    const {seriesId} = useParams();
    const {detailsSeries,loadingSeriesDetails,errSeriesDetails} = useSelector(reducer=>reducer.seriesDetails)
    const lastSeason = detailsSeries?.seasons?.[detailsSeries.seasons.length - 1]
    const date = new Date(lastSeason?.air_date);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDetailsSeries(seriesId));
    },[seriesId])
    return(
        <div className="p-7 flex flex-col">
            <p className="text-2xl py-3 text-[#0DCAF0] font-bold">Last Season</p> 
            {
                loadingSeriesDetails
                ?
                <div className="loader"></div>
                :
                errSeriesDetails
                ?
                <ErrorGetData/>
                :
                <div className="h-fit w-[90%] self-center bg-[#212529] flex flex-col text-white items-center font-bold text-base md:flex-row md:w-full md:h-[60%] md:items-start">
                    {
                        lastSeason?.poster_path
                        ?
                        <img className="w-full md:w-[25%] h-full" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${lastSeason?.poster_path}`} alt="" />
                        :
                        <img className="w-full md:w-[25%] h-full" src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="" />    
                    }
                    <div className="p-5 text-center md:text-left">
                        <p className="flex flex-col gap-7 md:flex-row"><span>{lastSeason?.name}</span><span className="bg-white h-fit rounded px-2 flex gap-2 items-center text-black w-fit self-center"><IoStar className="text-[#212529]"/>{lastSeason?.vote_average}</span><span>{date.getFullYear()} | {lastSeason?.episode_count} Episodes</span></p>
                        <p className="font-normal py-11">{lastSeason?.overview || "There is no Overview for this Season"}</p>
                    </div>
                </div>
            }
            <p className="text-[#0DCAF0] py-2 text-center md:text-left cursor-pointer" onClick={()=>navigate("seasons")}>View All Seasons</p>
        </div>
    )
}

export default LastSeason;
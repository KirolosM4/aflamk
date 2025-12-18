import React, { useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getCreditsSeries, getDetailsSeries } from "../Redux/Slices/DetailsSeriesSlice";
import { HiDocumentAdd } from "react-icons/hi";
import { CiStar } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import {Button} from "@material-tailwind/react"
import ErrorGetData from "../component/ErrorGetData"
const SeriesDetails = () => {
    const navigate = useNavigate();
    const {seriesId} = useParams();
    const {detailsSeries:{poster_path,backdrop_path,name,air_date,original_language,genres,runtime,overview},creditSeries,loadingSeriesDetails,errSeriesDetails,loadingCredit,errCredit} = useSelector(reducer=>reducer.seriesDetails)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDetailsSeries(seriesId));
        dispatch(getCreditsSeries(seriesId));
    },[seriesId])

    return(
       ( loadingSeriesDetails || loadingCredit)
        ?
        <div className="flex py-5 justify-center h-screen items-center">
            <div className="loader"></div>
        </div>
        :
       ( errSeriesDetails || errCredit)
        ?
        <div className="h-screen flex justify-center items-center">
            <ErrorGetData/>
        </div>
        :
        <div className="relative bg-no-repeat bg-cover bg-center before:opacity-25 before:content-[''] before:absolute before:top-0 before:h-full before:w-full before:bg-gradient-to-b before:from-black before:via-transparent before:to-black" style={{backgroundImage:`url(https://image.tmdb.org/t/p/w600_and_h900_bestv2/${backdrop_path})`}}>
            <p className="text-2xl p-3 text-[#0DCAF0] font-bold text-center md:text-3xl">Series-Details</p>
            <div className="flex flex-col gap-5 text-white md:flex-row">
                <div className="flex justify-center md:justify-end">
                    <img className="w-[70%] h-[90%]" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`} alt="" />
                </div>
                <div className="w-full p-3 flex flex-col md:w-[70%]">
                    <p className="text-2xl font-bold md:text-3xl py-2">{name}</p>
                    <p className="py-3">{air_date} <span className="capitalize">({original_language})</span> 👉 {genres?.map(({name},index)=>(<span key={index}> {name}, </span>))} 👈</p>
                    <p className="leading-9"><span className="text-2xl text-[#0DCAF0] font-bold text-center md:text-3xl">OverFlow : </span> <span>{overview}</span></p>
                    <p className="text-2xl text-[#0DCAF0] py-5 font-bold text-center md:text-left md:text-3xl">Casting </p>
                    <div className="flex flex-col justify-around py-3 text-center md:flex-row">
                        {
                            creditSeries?.cast?.slice(0,2)?.map(({name,known_for_department},index)=>(
                                <>
                                    <p className="flex flex-col"><span className="text-2xl">{name || ""}</span><span className="text-yellow-500">{known_for_department || ""}</span></p>
                                    {index > 0 ? "" : <span>||</span>}
                                </>
                            ))
                        }
                    </div>
                    <div className="flex flex-col justify-around py-3 text-center md:flex-row">
                        {
                            creditSeries?.crew?.slice(0,3).map(({name,known_for_department},index)=>(
                                <>
                                    <p className="flex flex-col"><span className="text-2xl">{name || ""}</span><span className="text-yellow-500">{known_for_department || ""}</span></p>
                                    {index > 1 ? "" : <span>||</span>}
                                </>
                            ))
                        }
                    </div>
                    <div className="flex flex-wrap justify-between items-center py-3 md:justify-around">
                        <p className="flex flex-col gap-3 text-center"><HiDocumentAdd color="green" className="text-2xl self-center relative"/><span className="text-white">AddTo WatchList</span></p>
                        <p className="flex flex-col gap-3 text-center"><CiStar color="yellow" className="text-2xl self-center relative"/><span className="text-white">Rate Movie</span></p>
                        <p className="flex flex-col gap-3 text-center"><FaYoutube color="red" className="text-2xl self-center relative" /><span className="text-white">Play Trailer</span></p>
                    </div>
                    <Button className="py-3 px-4 w-fit text-[#0DCAF0] bg-transparent self-center relative hover:bg-[#0DCAF0] hover:text-[#212529] border-[#0DCAF0]" variant="outlined" color="white" onClick={()=>navigate(-1)}>Back a step</Button>
                </div>
            </div>
        </div>
    )
}

export default SeriesDetails;
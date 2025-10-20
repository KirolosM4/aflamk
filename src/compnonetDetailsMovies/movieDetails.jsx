import React, { useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getCreditsMovie, getDetilsMovie } from "../Redux/Slices/DetailsMovieSlice";
import { HiDocumentAdd } from "react-icons/hi";
import { CiStar } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import {Button} from "@material-tailwind/react"
import ErrorGetData from "../component/ErrorGetData"
const MovieDetails = () => {
    const navigate = useNavigate();
    const {movieId,movieTitle} = useParams();
    const {detailsMovie:{poster_path,backdrop_path,title,release_date,original_language,genres,runtime,overview},creditMovie,loadingMovieDetails,errMovieDetails,loadingCredit,errCredit} = useSelector(reducer=>reducer.movieDetails)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDetilsMovie(movieId));
        dispatch(getCreditsMovie(movieId));
    },[])

    return(
       ( loadingMovieDetails || loadingCredit)
        ?
        <div className="flex py-5 justify-center h-screen items-center">
            <div className="loader"></div>
        </div>
        :
       ( errMovieDetails || errCredit)
        ?
        <div className="h-screen flex justify-center items-center">
            <ErrorGetData/>
        </div>
        :
        <div className="relative bg-no-repeat bg-cover bg-center before:opacity-25 before:content-[''] before:absolute before:top-0 before:h-full before:w-full before:bg-gradient-to-b before:from-black before:via-transparent before:to-black" style={{backgroundImage:`url(https://image.tmdb.org/t/p/w600_and_h900_bestv2/${backdrop_path})`}}>
            <p className="text-2xl p-3 text-[#0DCAF0] font-bold text-center md:text-3xl">Movie-Details</p>
            <div className="flex flex-col gap-5 text-white md:flex-row">
                <div className="flex justify-center md:justify-end">
                    <img className="w-[70%] h-[90%]" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`} alt="" />
                </div>
                <div className="w-full p-3 flex flex-col md:w-[70%]">
                    <p className="text-2xl font-bold md:text-3xl py-2">{title}</p>
                    <p className="py-3">{release_date} <span className="capitalize">({original_language})</span> 👉 {genres?.map(({name},index)=>(<span key={index}> {name}, </span>))} 👈 {Math.floor(runtime / 60)}h {(runtime % 60)} 1min </p>
                    <p className="leading-9"><span className="text-2xl text-[#0DCAF0] font-bold text-center md:text-3xl">OverFlow : </span> <span>{overview}</span></p>
                    <p className="text-2xl text-[#0DCAF0] py-5 font-bold text-center md:text-left md:text-3xl">Casting </p>
                    <div className="flex flex-col justify-around py-3 text-center md:flex-row">
                        <p className="flex flex-col"><span className="text-2xl">{creditMovie?.cast?.[0]?.["name"] || ""}</span><span className="text-yellow-500">{creditMovie?.cast?.[0]?.["known_for_department"] || ""}</span></p>
                        <span>||</span>
                        <p className="flex flex-col"><span className="text-2xl">{creditMovie?.cast?.[1]?.["name"] || ""}</span><span className="text-yellow-500">{creditMovie?.cast?.[1]?.["known_for_department"] || ""}</span></p>
                    </div>
                    <div className="flex flex-col justify-around py-3 text-center md:flex-row">
                        <p className="flex flex-col"><span className="text-2xl">{creditMovie?.crew?.[0]?.["name"] || ""}</span><span className="text-yellow-500">{creditMovie?.crew?.[0]?.["known_for_department"] || ""}</span></p>
                        <span>||</span>
                        <p className="flex flex-col"><span className="text-2xl">{creditMovie?.crew?.[1]?.["name"] || ""}</span><span className="text-yellow-500">{creditMovie?.crew?.[1]?.["known_for_department"] || ""}</span></p>
                        <span>||</span>
                        <p className="flex flex-col"><span className="text-2xl">{creditMovie?.crew?.[2]?.["name"] || ""}</span><span className="text-yellow-500">{creditMovie?.crew?.[1]?.["known_for_department"] || ""}</span></p>
                    </div>
                    <div className="flex justify-around py-3">
                        <p className="flex flex-col gap-3 text-center"><HiDocumentAdd color="green" className="text-2xl self-center"/><span className="text-white">AddTo WatchList</span></p>
                        <p className="flex flex-col text-center"><CiStar color="yellow" className="text-2xl self-center"/><span className="text-white">Rate Movie</span></p>
                        <p className="flex flex-col text-center"><FaYoutube color="red" className="text-2xl self-center" /><span className="text-white">Play Trailer</span></p>
                    </div>
                    <Button className="py-3 px-4 w-fit text-[#0DCAF0] bg-transparent self-center   hover:bg-[#0DCAF0] hover:text-[#212529] border-[#0DCAF0]" variant="outlined" color="white" onClick={()=>navigate(-1)}>Back a step</Button>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails;
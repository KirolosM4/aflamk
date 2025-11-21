import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getCreditsMovie, getDetilsMovie } from "../Redux/Slices/DetailsMovieSlice";
import { HiDocumentAdd } from "react-icons/hi";
import { CiStar } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import {Button} from "@material-tailwind/react"
import ErrorGetData from "../component/ErrorGetData"
import { getVideos } from "../Redux/Slices/MediaSlice";
const MovieDetails = () => {
    const [viewTrailer,setViewTrailer] = useState(false);
    const {videos,loadingVideo,errVideo} = useSelector(reducer=>reducer.mediaRedu);
    const navigate = useNavigate();
    const {movieId} = useParams();
    const {detailsMovie:{poster_path,backdrop_path,title,release_date,original_language,genres,runtime,overview},creditMovie,loadingMovieDetails,errMovieDetails,loadingCredit,errCredit} = useSelector(reducer=>reducer.movieDetails)
    const dispatch = useDispatch();
    console.log(videos[0]?.key)
    useEffect(()=>{
        dispatch(getDetilsMovie(movieId));
        dispatch(getCreditsMovie(movieId));
    },[])

    const GetTrailer = () => {
        return(
            loadingVideo
            ?
            <div className="fixed top-0 h-full bg-black w-full flex justify-center items-center z-50">
                <div className="loader"></div>
            </div>
            :
            <div className="fixed top-0 h-full bg-black w-full flex justify-center z-50 bg-opacity-50" onClick={()=>setViewTrailer(false)}>
                <iframe className="absolute w-1/3 h-[50vh] border-8 border-[#212529] viewTrailerAnim" src={`https://www.youtube.com/embed/${videos[0]?.key}?si=OtXxU9-V7xYVjVni`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        )
    }

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
        <div className={`relative bg-no-repeat bg-cover bg-center before:opacity-100 before:content-[''] before:absolute before:top-0 before:h-full before:w-full before:bg-gradient-to-b before:from-black before:via-transparent before:to-black`} style={{backgroundImage:`url(https://image.tmdb.org/t/p/w600_and_h900_bestv2/${backdrop_path})`}}>
            {viewTrailer && <GetTrailer/>}
            <p className="relative text-2xl p-3 text-[#0DCAF0] font-bold text-center md:text-3xl">Movie-Details</p>
            <div className="flex flex-col gap-5 text-white lg:flex-row relative">
                <div className="flex justify-center lg:justify-end">
                    <img className="w-[70%] sm:w-[50%] md:w-[30%] lg:w-[70%] h-[90%]" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`} alt="" />
                </div>
                <div className="w-full p-3 flex flex-col lg:w-[70%] text-center md:text-left">
                    <p className="text-2xl font-bold py-2 md:text-3xl">{title}</p>
                    <p className="py-3">{release_date} <span className="capitalize">({original_language})</span> 👉 {genres?.map(({name},index)=>(<span key={index}> {name}, </span>))} 👈 {Math.floor(runtime / 60)}h {(runtime % 60)} min </p>
                    <p className="leading-9"><span className="text-2xl text-[#0DCAF0] font-bold md:text-3xl">OverFlow : </span> <span>{overview}</span></p>
                    <p className="text-2xl text-[#0DCAF0] py-5 font-bold text-center lg:text-left md:text-3xl">Casting </p>
                    <div className="flex flex-col justify-around py-3 text-center md:flex-row">
                        {
                            creditMovie?.cast?.slice(0,2)?.map(({name,known_for_department},index)=>(
                                <>
                                    <p key={index} className="flex flex-col"><span className="text-2xl">{name || ""}</span><span className="text-yellow-500">{known_for_department || ""}</span></p>
                                    {index > 0 ? "" : <span>||</span>}
                                </>
                            ))
                        }
                    </div>
                    <div className="flex flex-col justify-around py-3 text-center md:flex-row">
                        {
                            creditMovie?.crew?.slice(0,3)?.map(({name,known_for_department},index)=>(
                                <>
                                    <p key={index} className="flex flex-col"><span className="text-2xl">{name || ""}</span><span className="text-yellow-500">{known_for_department || ""}</span></p>
                                    {index > 1 ? "" : <span>||</span>}
                                </>
                            ))
                        }
                    </div>
                    <div className="flex flex-wrap justify-between items-center py-3 md:justify-around">
                        <p className="flex flex-col gap-3 text-center"><HiDocumentAdd color="green" className="text-2xl self-center relative"/><span className="text-white">AddTo WatchList</span></p>
                        <p className="flex flex-col gap-3 text-center"><CiStar color="yellow" className="text-2xl self-center relative"/><span className="text-white">Rate Movie</span></p>
                        <p className="flex flex-col gap-3 text-center" onClick={()=>{dispatch(getVideos(movieId));setViewTrailer(true);}}><FaYoutube color="red" className="text-2xl self-center relative" /><span className="text-white">Play Trailer</span></p>
                    </div>
                    <Button className="py-3 px-4 w-fit text-[#0DCAF0] bg-transparent self-center relative hover:bg-[#0DCAF0] hover:text-[#212529] border-[#0DCAF0]" variant="outlined" color="white" onClick={()=>navigate(-1)}>Back a step</Button>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails;

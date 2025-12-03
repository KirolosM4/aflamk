import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getDetilsMovie } from "../Redux/Slices/DetailsMovieSlice";

const HeaderMedia = () => {
    const {detailsMovie:{poster_path,release_date,title}} = useSelector(reducer=>reducer.movieDetails)
    const date = new Date(release_date).getFullYear();
    const navigate = useNavigate();
    const {movieId} = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDetilsMovie(movieId));
    },[movieId])

    return(
        <div className="bg-[#212529] text-white">
            <div className="container mx-auto flex items-center gap-5 p-5">
                <img className="w-[8em]" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`} alt="" />
                <div>
                    <p className="text-2xl">{title} <span className="text-gray-500">({date})</span></p>
                    <p className="text-gray-500 flex gap-3 items-center hover:text-white cursor-pointer" onClick={()=>navigate(-1)}><IoIosArrowRoundBack /> Back to main</p>
                </div>
            </div>
        </div>
    )
}

export default HeaderMedia;
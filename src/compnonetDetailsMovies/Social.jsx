import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getReviews } from "../Redux/Slices/ReviewsSlice";
import ErrorGetData from "../component/ErrorGetData";
import {Button} from "@material-tailwind/react";

const Social = () => {
    const {detailsMovie:{title}} = useSelector(reducer=>reducer.movieDetails)
    const {reviews,loadingReviews,errReviews} = useSelector(reducer=>reducer.ReviewsData);
    const [showAllContent,setShowAllContent] = useState(false);
    const {movieId} = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getReviews(movieId));
    },[])
    return(
        <div className="px-7">
            <p className="text-2xl py-3 text-[#0DCAF0] font-bold">Social</p>
            <p className="cursor-pointer p-5 text-white text-[#9C27B0] border-b-2 border-b-[#9C27B0] w-fit">REVIEWS {reviews.length}</p>
            {
                loadingReviews
                ?
                <div className="loader"></div>
                :
                errReviews
                ?
                <ErrorGetData/>
                :
                    <div className="bg-[#212529] text-white p-5 flex flex-col items-center gap-5 text-center md:text-left md:items-start md:grid md:grid-cols-12 border-t-2 border-gray-500">
                    {
                        reviews.length == 0
                        ?
                        <p className="col-span-11">We don't have any reviews for <span className="text-[#0DCAF0]">{title}</span></p>
                        :
                        <>
                            <p className="bg-gray-500 text-2xl col-start-1 h-16 w-16 rounded-full flex justify-center items-center">R</p>
                            <div className="col-start-2 col-span-10 flex flex-col gap-3">
                                <p className="text-2xl">A review by <span className="text-[#0DCAF0] font-bold"> {reviews[0]?.author}</span></p>
                                <p>Written by <span className="text-[#0DCAF0] font-bold"> {reviews[0]?.author}</span> on <span className="text-[#0DCAF0] font-bold">{new Date(reviews[0]?.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span></p>
                                <p className="text-blue-500">Content:-</p>
                                <p>{showAllContent ? reviews[0]?.content : reviews[0]?.content.slice(0,250) + "..."} <span className="text-[#0DCAF0] underline cursor-pointer" onClick={()=>setShowAllContent(!showAllContent)}>{showAllContent ? "Show less" : "Show more"}</span></p>
                            </div>
                        </>
                    }
                </div>
            }
            <p className="text-center text-[#0DCAF0] md:text-left py-2">Read All Reviews</p>
        </div>
    )
}

export default Social;
import React, { useEffect, useState } from "react";
import HeaderMedia from "./HeaderMedia";
import {useDispatch, useSelector} from "react-redux";
import { getReviews } from "../Redux/Slices/ReviewsSlice";
import { useParams } from "react-router-dom";

const AllReviews = () => {
    const {movieId} = useParams();
    const {reviews} = useSelector(reducer=>reducer.ReviewsData);
    const dispatch = useDispatch();
    const [stateReviews,setStateReviews] = useState([]);

    useEffect(()=>{
        dispatch(getReviews(movieId));
    },[movieId])
    
    useEffect(() => {
    if (reviews.length > 0) {
        setStateReviews(Array(reviews.length).fill(false));
    }
}, [reviews]);

    return(
        <div className="bg-black">
            <HeaderMedia/>
            <div className="text-white p-11 flex flex-col gap-5 text-center md:text-left">
                {
                    reviews.map(({author,created_at,content},index)=>(                       
                        <div className="bg-[#212529] flex flex-col items-center p-7 gap-7 md:flex-row">
                            <p className="bg-gray-500 text-2xl h-16 w-16 p-7 rounded-full flex justify-center items-center">R</p>
                            <div className="flex flex-col gap-3">
                                <p className="text-2xl">A review by <span className="text-[#0DCAF0] font-bold"> {author}</span></p>
                                <p>Written by <span className="text-[#0DCAF0] font-bold"> {author}</span> on <span className="text-[#0DCAF0] font-bold">{new Date(created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span></p>
                                <p className="text-blue-500">Content:-</p>
                                <p className="w-fit">{stateReviews[index] ? content : content.slice(0,250) + "..."} <span className="text-[#0DCAF0] underline cursor-pointer" onClick={()=> setStateReviews(stateReviews.map((rev,indexR)=> indexR == index ? rev = !rev : rev))}>{stateReviews[index] ? "Show less" : "Show more"}</span></p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AllReviews;
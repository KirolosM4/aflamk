import React, { useEffect, useState } from "react";
import HeaderMedia from "./HeaderMedia";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "../Redux/Slices/MediaSlice";
import { useParams } from "react-router-dom";

const AllVideos = () => {
    const {movieId} = useParams();
    const {videos,loadingVideo} = useSelector(reducer=>reducer.mediaRedu);
    const [allVideos,setAllVideos] = useState({});
    const [viewVideo,setViewVideo] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (videos && videos.length > 0) {
            const newVideos = videos.reduce((acc, video) => {
                const typeV = video.type;
                if (!acc[typeV]) acc[typeV] = [];
                acc[typeV].push(video.key);
                return acc;
            }, {});
            setAllVideos(newVideos);
        }
    }, [videos]);
    
    useEffect(() => {
    const entries = Object.entries(allVideos);
    if (entries.length > 0) {
        setViewVideo(entries[0][1]);
    }
    }, [allVideos]);
    return(
        <div className="bg-black">
            <HeaderMedia/>
            {
                loadingVideo
                ?
                <div className="flex py-5 justify-center h-screen items-center">
                    <div className="loader"></div>
                </div>                
                :
                <>
                    <p className="text-2xl p-11 text-[#0DCAF0] font-bold" >Social</p>
                    <div className="flex justify-center gap-7 ">
                        {
                            Object.entries(allVideos).map(([typeV,video])=>(
                                <p className={`cursor-pointer py-5 text-[#9C27B0] text-white`} onClick={()=>setViewVideo(video)}>{typeV} ({video?.length})</p>
                            ))
                        }
                    </div>
                    <div className="flex flex-col gap-7 bg-[#212529] mx-11 p-2">
                        {
                            viewVideo.map((video)=>(
                                <iframe className="h-[40vh]" src={`https://www.youtube.com/embed/${video}?si=vHGhpnsYXeS0ppCr&amp;start=4`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            ))
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default AllVideos
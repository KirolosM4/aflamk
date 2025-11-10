import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getMedia, getVideos} from "../Redux/Slices/MediaSlice";
import { FaArrowRightLong } from "react-icons/fa6";
import { Card, CardHeader } from "@material-tailwind/react";
import ErrorGetData from "../component/ErrorGetData";

const Media = () => {
    const [mediaView,setMediaView] = useState("video");
    const {movieId} = useParams();
    const {loadingMedia,errMedia,media:{backdrops,posters},loadingVideo,errVideo,videos} = useSelector(reducer=>reducer.mediaRedu);
    const dispatch = useDispatch();

    const VideoView = () => {
        return(
            videos?.slice(0,5)?.map(({key},index)=>(
                <Card key={index} className="bg-[#212529] flex flex-col justify-between p-2">
                    {
                        index == 4
                        ?
                        <p className="text-white w-[50vw] md:w-[25vw] lg:w-[15vw] flex justify-center items-center h-full gap-3">Show More <FaArrowRightLong /> </p>
                        :
                        <CardHeader className="m-0 rounded-none shadow-none w-[100vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] h-screen bg-gray">
                            <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${key}?si=OtXxU9-V7xYVjVni`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </CardHeader>
                    }
                </Card>
            ))
        )
    }
    const BackDrops = () => {
        return(
            backdrops?.slice(0,7)?.map(({file_path},index)=>(
                <Card key={index} className="bg-[#212529] flex flex-col justify-between p-2">
                    {
                        index == 6
                        ?
                        <p className="text-white w-[50vw] md:w-[25vw] lg:w-[15vw] flex justify-center items-center h-full gap-3">Show More <FaArrowRightLong /> </p>
                        :
                        <CardHeader className="m-0 rounded-none shadow-none w-[55vw] md:w-[40vw] lg:w-[30vw] xl:w-[15vw] h-screen bg-gray">
                            <img className="h-full w-full" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${file_path}`} alt="" />
                        </CardHeader>
                    }
                </Card>
            ))
        )
    }
    const Posters = () => {
        return(
            posters?.slice(0,7)?.map(({file_path},index)=>(
                <Card key={index} className="bg-[#212529] flex flex-col justify-between p-2">
                    {
                        index == 6
                        ?
                        <p className="text-white w-[50vw] md:w-[25vw] lg:w-[15vw] flex justify-center items-center h-full gap-3">Show More <FaArrowRightLong /> </p>
                        :
                        <CardHeader className="m-0 rounded-none shadow-none w-[55vw] md:w-[30vw] lg:w-[30vw] xl:w-[15vw] h-screen bg-gray">
                            <img className="h-full w-full" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${file_path}`} alt="" />
                        </CardHeader>
                    }
                </Card>
            ))
        )
    }

    useEffect(()=>{
        dispatch(getMedia(movieId));
        dispatch(getVideos(movieId));
    },[]);

    return(
        <div className="px-7">
            <p className="text-2xl py-3 text-[#0DCAF0] font-bold">Media</p>
            <div className="flex gap-3 justify-between sm:justify-start md:gap-7">
                <p className={`cursor-pointer text-sm py-5 md:p-5 text-[#9C27B0] ${mediaView == "video" ? "text-[#9C27B0] border-b-2 border-b-[#9C27B0] "  : "text-white"} `} onClick={()=>setMediaView("video")}>Videos ({videos?.length})</p>
                <p className={`cursor-pointer text-sm py-5 md:p-5 text-[#9C27B0] ${mediaView == "backdrop" ? "text-[#9C27B0] border-b-2 border-b-[#9C27B0]"  : "text-white"} `} onClick={()=>setMediaView("backdrop")}>BACKDROPS ({backdrops?.length})</p>
                <p className={`cursor-pointer text-sm py-5 md:p-5 text-[#9C27B0] ${mediaView == "poster" ? "text-[#9C27B0] border-b-2 border-b-[#9C27B0]"  : "text-white"} `} onClick={()=>setMediaView("poster")}>POSTERS ({posters?.length})</p>
            </div>
            {
                (loadingMedia || loadingVideo)
                ?
                <div className="loader"></div>
                :
                (errMedia || errVideo)
                ?
                <ErrorGetData/>
                :
                <div className="overflow-x-scroll h-[50vh] sm:h-[60vh] md:h-[40vh] flex flex bg-[#212529]">
                    {mediaView == "video" ? <VideoView/> : mediaView == "backdrop" ? <BackDrops/> : <Posters/>}
                </div>
            }
        </div>
    )
}

export default Media;
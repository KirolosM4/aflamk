import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
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
    const navigate = useNavigate();
    const VideoView = () => {
        return(
            <div className={`overflow-x-auto  flex flex bg-[#212529] ${videos.length == 0 ? "h-fit" : "h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[30vh] xl:h-[50vh]"}`}>
                {
                    videos.length == 0
                    ?
                    <p className="p-3 text-white">no video added</p>
                    :
                    videos?.slice(0,6)?.map(({key},index)=>(
                        <Card key={index} className="bg-[#212529] flex flex-col justify-between p-2">
                            {
                                index == 5
                                ?
                                <p className="text-white w-[50vw] md:w-[25vw] lg:w-[15vw] flex justify-center items-center h-full gap-3 cursor-pointer" onClick={()=>navigate("videos")}>Show More <FaArrowRightLong /> </p>
                                :
                                <CardHeader className="m-0 rounded-none shadow-none w-[80vw] md:w-[40vw] lg:w-[35vw] h-screen bg-gray">
                                    <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${key}?si=OtXxU9-V7xYVjVni`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                </CardHeader>
                            }
                        </Card>
                    ))
                }
            </div>
        )
    }
    const BackDrops = () => {
        return(
            <div className={`overflow-x-scroll h-[50vh] flex flex bg-[#212529] ${backdrops.length == 0 ? "h-fit" : "h-[50vh]"}`}>
                {
                    backdrops.length == 0
                    ?
                    <p className="p-3 text-white">no video added</p>
                    :
                    backdrops?.slice(0,7)?.map(({file_path},index)=>(
                        <Card key={index} className="bg-[#212529] flex flex-col justify-between p-2">
                            {
                                index == 6
                                ?
                                <p className="text-white w-[50vw] md:w-[25vw] lg:w-[15vw] flex justify-center items-center h-full gap-3 cursor-pointer" onClick={()=>navigate("videos")}>Show More <FaArrowRightLong /> </p>
                                :
                                <CardHeader className="m-0 rounded-none shadow-none w-[50vw] md:w-[20vw] lg:w-[35vw] xl:w-[20vw] h-screen bg-gray">
                                    <img className="h-full w-full" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${file_path}`} alt="" />
                                </CardHeader>
                            }
                        </Card>
                    ))
                }
            </div>
        )
    }
    const Posters = () => {
        return(
            <div className={`overflow-x-scroll h-[50vh] flex flex bg-[#212529] ${posters.length == 0 ? "h-fit" : "h-[50vh]"}`}>
                {
                    posters.length == 0
                    ?
                    <p className="p-3 text-white">no video added</p>
                    :
                    posters?.slice(0,7)?.map(({file_path},index)=>(
                        <Card key={index} className="bg-[#212529] flex flex-col justify-between p-2">
                            {
                                index == 6
                                ?
                                <p className="text-white w-[50vw] md:w-[25vw] lg:w-[15vw] flex justify-center items-center h-full gap-3">Show More <FaArrowRightLong /> </p>
                                :
                                <CardHeader className="m-0 rounded-none shadow-none w-[50vw] md:w-[20vw] lg:w-[35vw] xl:w-[20vw] h-screen bg-gray">
                                    <img className="h-full w-full" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${file_path}`} alt="" />
                                </CardHeader>
                            }
                        </Card>
                    ))
                }
            </div>
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
                <>
                    {mediaView == "video" ? <VideoView/> : mediaView == "backdrop" ? <BackDrops/> : <Posters/>}
                </>
            }
        </div>
    )
}

export default Media;
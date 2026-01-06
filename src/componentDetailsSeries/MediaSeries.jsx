import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { FaArrowRightLong } from "react-icons/fa6";
import { Card, CardHeader } from "@material-tailwind/react";
import ErrorGetData from "../component/ErrorGetData";
import { getMediaSeries, getVideosSeries } from "../Redux/Slices/MediaSeriesSlice";

const MediaSeries = () => {
    const [mediaView,setMediaView] = useState("video");
    const {seriesId} = useParams();
    const {loadingMedia,errMedia,mediaSeries:{backdrops,posters},loadingVideo,errVideo,videosSeries} = useSelector(reducer=>reducer.mediaSeriesRedu);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const VideoViewSeries = () => {
        return(
            <div className={`overflow-x-auto  flex flex bg-[#212529] ${videosSeries.length == 0 ? "h-fit" : "h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[30vh] xl:h-[50vh]"}`}>
                {
                    videosSeries.length == 0
                    ?
                    <p className="p-3 text-white">no video added</p>
                    :
                    videosSeries?.slice(0,6)?.map(({key},index)=>(
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
    const BackDropsSeries = () => {
        return(
            <div className={`overflow-x-scroll h-[55vh] flex flex bg-[#212529] ${backdrops.length == 0 ? "h-fit" : "h-[50vh]"}`}>
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
                                <p className="text-white w-[50vw] md:w-[25vw] lg:w-[15vw] flex justify-center items-center h-full gap-3 cursor-pointer" onClick={()=>navigate("backdrops")}>Show More <FaArrowRightLong /> </p>
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
    const PostersSeries = () => {
        return(
            <div className={`overflow-x-scroll h-[55vh] flex flex bg-[#212529] ${posters.length == 0 ? "h-fit" : "h-[50vh]"}`}>
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
                                <p className="text-white w-[50vw] md:w-[25vw] lg:w-[15vw] flex justify-center items-center h-full gap-3 cursor-pointer" onClick={()=>navigate("posters")}>Show More <FaArrowRightLong /> </p>
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
        dispatch(getMediaSeries(seriesId));
        dispatch(getVideosSeries(seriesId));
    },[seriesId]);

    return(
        <div className="px-7">
            <p className="text-2xl py-3 text-[#0DCAF0] font-bold">Media</p>
            <div className="flex gap-3 justify-between sm:justify-start md:gap-7">
                <p className={`cursor-pointer text-sm py-5 md:p-5 text-[#9C27B0] ${mediaView == "video" ? "text-[#9C27B0] border-b-2 border-b-[#9C27B0]"  : "text-white"} `} onClick={()=>setMediaView("video")}>Videos ({videosSeries?.length})</p>
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
                    {mediaView == "video" ? <VideoViewSeries/> : mediaView == "backdrop" ? <BackDropsSeries/> : <PostersSeries/>}
                </>
            }
        </div>
    )
}

export default MediaSeries;
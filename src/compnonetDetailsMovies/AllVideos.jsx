import React, { useEffect, useState } from "react";
import HeaderMedia from "./HeaderMedia";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "../Redux/Slices/MediaSlice";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
const AllVideos = () => {
    const {movieId} = useParams();
    const {videos,loadingVideo} = useSelector(reducer=>reducer.mediaRedu);
    const [allVideos,setAllVideos] = useState({});
    const [viewVideo,setViewVideo] = useState([]);
    const [countslide,setCountSlide] = useState(0);
    const dispatch = useDispatch();

    const updateSlideCount = () =>{
        window.innerWidth > 1200 ? setCountSlide(4) : window.innerWidth > 920 ? setCountSlide(3) : window.innerWidth > 760 ? setCountSlide(2) : setCountSlide(1);
        window.addEventListener('resize',updateSlideCount);
    }

    useEffect(() => {
        dispatch(getVideos(movieId));
    }, [movieId]);

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
            setViewVideo(entries[0]);
        }
        console.log(viewVideo)
    }, [allVideos ]);
    useEffect(()=>{
        updateSlideCount()
    },[])
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
                    <p className="text-2xl p-3 text-[#0DCAF0] font-bold text-center md:text-left md:p-11" >Social</p>
                    <Swiper className="flex justify-center gap-7 "
                        navigation={countslide < 3}
                        modules={[Pagination, Navigation]}
                        loop={false}
                        slidesPerView={countslide}
                    >

                        {
                            Object.entries(allVideos).map(([typeV,video])=>(
                                <SwiperSlide className="flex justify-items-center">
                                    <p className={`cursor-pointer p-5 ${viewVideo[0] == typeV ? "text-[#9C27B0] border-b-2 border-b-[#9C27B0]" : "text-white  " }`} onClick={()=>setViewVideo([typeV,video])}>{typeV} ({video?.length})</p>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <div className="flex flex-col gap-7 bg-[#212529] mx-2 md:mx-11 p-2">
                        {
                            viewVideo[1]?.map((video)=>(
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
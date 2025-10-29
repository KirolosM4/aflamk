import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNowPlayingSeries } from "../Redux/Slices/HomeSlice";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import ErrorGetData from "../component/ErrorGetData";
import { useNavigate } from "react-router-dom";

const NowPlayingSeries = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [countSlide,setCountSlide] = useState(1);;
    const {nowPlayingSeries,loadingNowPlayingSeries,errNowPlayingSeries} = useSelector(reducer=>reducer.HomeRedu)
    const updateSlideCount = () => {
        window.innerWidth > 1200 ? setCountSlide(4) : window.innerWidth > 920 ? setCountSlide(3) : window.innerWidth > 760 ? setCountSlide(2) : setCountSlide(1);
        window.addEventListener('resize',updateSlideCount);
    }
    useEffect(()=>{
        dispatch(getNowPlayingSeries())
    },[])
    useEffect(()=>{
        updateSlideCount()
    },[])
    return(
        <div className="container mx-auto flex flex-col">
            <p className="text-3xl font-bold text-[#0DCAF0] py-11 text-center md:text-4xl md:text-left">SERIES</p>
            {
                loadingNowPlayingSeries
                ?
                <div className="loader self-center"></div>
                :
                errNowPlayingSeries
                ?
                <ErrorGetData/>
                :
                <Swiper
                navigation={true}
                modules={[Pagination, Navigation]}
                className="w-full h-full mySwiper"
                loop={true}
                slidesPerView={countSlide}
                >
                    {
                        nowPlayingSeries.map(({id,poster_path,title})=>(
                            <SwiperSlide key={id} className="flex justify-items-center">
                                <img className="w-[60%] h-full object-cover md:w-[75%] md:px-2 cursor-pointer" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster_path}`} onClick={()=>navigate(`/series/${id}/title/${title}`)} alt="" />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            }

        </div>
    )
}

export default NowPlayingSeries;

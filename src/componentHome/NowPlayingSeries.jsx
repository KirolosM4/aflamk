import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNowPlayingSeries } from "../Redux/Slices/HomeSlice";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const NowPlayingSeries = () => {
    const dispatch = useDispatch();
    const withBrowser = window.innerWidth;
    const {nowPlayingSeries,loadingNowPlayingSeries,errNowPlayingSeries} = useSelector(reducer=>reducer.HomeRedu)
    useEffect(()=>{
        dispatch(getNowPlayingSeries())
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
                <p className="text-red-500 text-3xl text-center">try again later 🙁</p>
                :
                <Swiper
                navigation={true}
                modules={[Pagination, Navigation]}
                className="w-full h-full mySwiper"
                loop={true}
                slidesPerView={withBrowser > 1200 ? 4 : withBrowser > 920 ? 3 : withBrowser > 760 ? 2 : 1}
                >
                    {
                        nowPlayingSeries.map((serie)=>(
                            <SwiperSlide key={serie.id} className="flex justify-items-center">
                                <img className="w-[60%] h-full object-cover md:w-[75%] md:px-2" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${serie.backdrop_path}`} alt="" />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            }

        </div>
    )
}

export default NowPlayingSeries;

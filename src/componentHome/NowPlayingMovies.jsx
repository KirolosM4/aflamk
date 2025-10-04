import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNowPlayingMovie } from "../Redux/Slices/HomeSlice";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const NowPlayingMovie = () => {
    const dispatch = useDispatch();
    const withBrowser = window.innerWidth;
    const {nowPlayingMovie,loadingNowPlayingMovie} = useSelector(reducer=>reducer.HomeRedu)
    useEffect(()=>{
        dispatch(getNowPlayingMovie())
    },[])
    return(
        <div className="container mx-auto flex flex-col">
            <p className="text-4xl font-bold text-[#0DCAF0] py-5 text-center md:text-left">MOVIES</p>
            <Swiper
                navigation={true}
                modules={[Pagination, Navigation]}
                className="w-full h-full"
                loop={true}
                longSwipes="ture"
                slidesPerView={withBrowser > 1200 ? 4 : withBrowser > 920 ? 3 : withBrowser > 760 ? 2 : 1}
                >
                {
                    loadingNowPlayingMovie
                    ?
                    <div className="loader justify-self-center"></div>
                    :
                    nowPlayingMovie.map((movie)=>(
                         <SwiperSlide className="flex justify-items-center p-7">
                            <img className="w-[90%] h-full object-cover" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.backdrop_path}`} alt="" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default NowPlayingMovie;

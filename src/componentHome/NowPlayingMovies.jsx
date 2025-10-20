import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNowPlayingMovies } from "../Redux/Slices/HomeSlice";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import ErrorGetData from "../component/ErrorGetData";
import { useNavigate } from "react-router-dom";

const NowPlayingMovies = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [countslide,setCountSlide] = useState(1);
    const {nowPlayingMovies,loadingNowPlayingMovies,errNowPlayingMovies} = useSelector(reducer=>reducer.HomeRedu)
    
    const updateSlideCount = () =>{
        window.innerWidth > 1200 ? setCountSlide(4) : window.innerWidth > 920 ? setCountSlide(3) : window.innerWidth > 760 ? setCountSlide(2) : setCountSlide(1);
        window.addEventListener('resize',updateSlideCount);
    }

    useEffect(()=>{
        dispatch(getNowPlayingMovies())
    },[])
    useEffect(()=>{
        updateSlideCount()
    },[])
    return(
        <div className="container mx-auto flex flex-col">
            <p className="text-3xl font-bold text-[#0DCAF0] py-11 text-center md:text-4xl md:text-left">MOVIES</p>
            {
                loadingNowPlayingMovies
                ?
                <div className="loader self-center"></div>
                :
                errNowPlayingMovies
                ?
                <ErrorGetData/>
                :
                <Swiper
                navigation={true}
                modules={[Pagination, Navigation]}
                className="w-full h-full mySwiper"
                loop={true}
                slidesPerView={countslide}
                    >
                    {
                        nowPlayingMovies.map(({id,poster_path,title})=>(
                         <SwiperSlide key={id} className="flex justify-items-center">
                            <img className="w-[60%] h-full object-cover md:w-[75%] md:px-2 cursor-pointer" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster_path}`} onClick={()=>navigate(`/movie/${id}/title/${title}`)} alt="" />
                        </SwiperSlide>
                    ))
                    }
                </Swiper>
            }

        </div>
    )
}

export default NowPlayingMovies;

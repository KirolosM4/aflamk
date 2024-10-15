import React, {useEffect, useState } from 'react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { getSeries } from '../../redux/Slice/SeriesCarousalSlice';
import { Link } from 'react-router-dom';
const SeriesCarousal = () => {
    const {series} = useSelector(state => state.mySeries);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getSeries())
    },[])
    return(
        <div className='lg:mx-14 px-5'>
            <div className='text-center lg:text-left p-5'>
                <p className='styleHeaderCyn'>Series</p>
            </div>
            <Swiper
            modules={[Virtual, Navigation, Pagination]}
            slidesPerView={window.innerWidth > 1100 ? 4 : window.innerWidth >700 ? 2 : 1 }
            centeredSlides={false}
            spaceBetween={30}
            navigation={true}
            virtual
            loop={true}
        >
            {series.map(({poster_path,id}, index) => (
              <SwiperSlide key={index} virtualIndex={index}>
    <Link to={`/seriesdetails/${id}`}>

                <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`} alt="" />
          </Link>
            </SwiperSlide>
            ))}
        </Swiper>
        </div>
    )
}

export default SeriesCarousal;
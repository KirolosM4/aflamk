import React, { useEffect } from "react";
import HeaderMediaSeries from "./HeaderMediaSeries";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsSeries } from "../Redux/Slices/DetailsSeriesSlice";
import { IoStar } from "react-icons/io5";
const SeasonsSeries = () => {
    const navigate = useNavigate();
    const {seriesId} = useParams();
    const {detailsSeries,loadingSeriesDetails,errSeriesDetails} = useSelector(reducer=>reducer.seriesDetails);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDetailsSeries(seriesId));
    },[seriesId])
    return(
        <div className="bg-black">
            <HeaderMediaSeries/>
            <div className="p-11 flex flex-col gap-11">
                {
                    detailsSeries?.seasons?.map((season)=>(
                        <div className="h-fit w-[90%] self-center bg-[#212529] flex flex-col text-white items-center font-bold text-base md:flex-row md:w-full md:h-[50vh] md:items-start">
                            {
                                season?.poster_path
                                ?
                                <img className="w-full md:w-[25%] h-full" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${lastSeason?.poster_path}`} alt="" />
                                :
                                <img className="w-full md:w-[25%] h-full" src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="" />    
                            }                            
                            <div className="w-[85%] p-5 flex flex-col gap-5 text-center md:text-left">
                                <p className="flex flex-col gap-7 md:flex-row text-2xl">
                                    <span>{season?.name}</span>
                                    {season?.vote_average > 0 &&  <span className="bg-white text-base h-fit rounded px-2 flex gap-2 items-center text-black w-fit self-center"><IoStar className="text-[#212529]"/>{season?.vote_average}</span>}
                                    <span>{season?.air_date && new Date(season?.air_date).getFullYear()} | {season?.episode_count} Episodes</span>
                                </p>
                                <p className="font-light">Season <span className="text-[#0DCAF0]">{season?.season_number} </span>of Supernatural premiered on <span className="text-[#0DCAF0]">{season?.air_date == null ? "January 1, 1970" : new Date(season?.air_date).toLocaleDateString()}</span></p>
                                <p className="font-normal">{season?.overview == "" ? "There is no Overview for this Season" : season?.overview}</p>

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SeasonsSeries;
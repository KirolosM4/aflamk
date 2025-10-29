import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "./Redux/Slices/MoviesSlice";
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Rating,
} from "@material-tailwind/react";
import Pagination from "./componentMoviesAndSeries/Pagination";
import {useNavigate} from "react-router-dom";

const Movies = () => {
    const navigate = useNavigate();
    const [numberPagination,setNumberPagination] = useState(1);
    const {loadingMovies,movies,errorMovies} = useSelector(reducer=>reducer.MoviesRed)
    const dispatch  = useDispatch();
    useEffect(()=>{
        dispatch(getMovies(numberPagination));
    },[numberPagination])
    return(
        <div className="bg-black text-white py-3">
            <p className="text-2xl my-3 font-bold text-center md:text-3xl">MOVIES</p>
            <p className="text-2xl my-3 font-bold text-center md:text-3xl">PAGE NUMBER <span className="text-[#0DCAF0]">{numberPagination}</span> FROM <span className="text-[#0DCAF0]">500</span></p>
            <div className={`container mx-auto flex flex-col ${loadingMovies && "h-[50vh] justify-center"}`}>
                {
                    loadingMovies
                    ?
                    <div className="loader self-center"></div>
                    :
                    errorMovies
                    ?
                    <ErrorGetData/>
                    :
                    <div className="py-4 grid grid-cols-1 justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {
                            movies.map(({id,poster_path,title,vote_average})=>(
                                <Card key={id} className="mt-6 w-[75%] bg-[#212529] md:w-[95%]">
                                    <CardHeader className="m-0 h-[75%] md:h-[70%] rounded-none shadow-none">
                                        <img
                                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster_path}`}
                                        alt="card-image"
                                        className="object-cover h-full w-full"
                                        />
                                    </CardHeader>
                                    <CardBody className="text-white flex flex-col justify-around grow">
                                        <p className="text-xl">TITLE : {title}</p>
                                        <div className="flex flex-wrap justify-between">
                                            <span>RATE: <span className="text-[#0DCAF0]">{vote_average}</span></span>
                                            <Rating value={Math.floor(vote_average/2)} readonly/>
                                        </div>
                                        <Button className="py-3 px-4 w-fit text-[#0DCAF0] bg-[#212529] self-center hover:bg-[#0DCAF0] hover:text-[#212529] border-[#0DCAF0]" variant="outlined" color="white" onClick={()=>navigate(`/movie/${id}/title/${title}`)}>DETAILS</Button>
                                    </CardBody>
                                </Card>
                            ))
                        }
                    </div>
                }

            </div>
            <Pagination setNumberPagination={setNumberPagination} numberPagination={numberPagination}/>
        </div>
    )
}

    export default Movies;
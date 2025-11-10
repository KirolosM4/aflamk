import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ErrorGetData from "../component/ErrorGetData";
import {
    Card,
    CardHeader,
    CardBody,
} from "@material-tailwind/react";
const Recommendation = () => {
    const [recommendation,setRecommendation] = useState([]);
    const [loadingReco,setLoadingReco] = useState(false);
    const [errReco,setErrReco] = useState(false);
    const {movieId} = useParams();
    const getRecom = () => {
        axios({
            method:"get",
            url: `https://api.themoviedb.org/3/movie/${movieId}/recommendations`,
            params: {language: 'en-US', page: '1'},
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MDcwOS41NDEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLDzvE3JjpnDnXJp65L2ww7pclm633QVmw5K1JssZEY'
            }
        }).then((res)=>{
            setRecommendation(res.data.results);
            setErrReco(false);
            setLoadingReco(false);
        }).catch((e)=>{
            setErrReco(true);
            setLoadingReco(false);
        })
    }

    useEffect(()=>{
        getRecom();
    },[]);

    return(
        <div className="p-7">
            <p className="text-2xl py-3 text-[#0DCAF0] font-bold">Recommendation</p>
            {
                loadingReco
                ?
                <div className="loader"></div>
                :
                errReco
                ?
                <ErrorGetData/>
                :
                <div className="overflow-x-scroll flex flex gap-5">
                    {
                        recommendation?.map(({id,poster_path,vote_average,title})=>(
                            <Card key={id} className="bg-[#212529] flex flex-col justify-between">
                                <CardHeader className="m-0 p-2 shadow-none w-[70vw] md:w-[30vw] lg:w-[22vw] bg-gray">
                                    <img
                                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster_path}`}
                                    alt="card-image"
                                    className=" h-full w-full rounded"
                                    />
                                </CardHeader>
                                <CardBody className="text-white px-2 py-3 md:p-3 text-[0.9em] flex justify-between items-center grow justify-self-center">
                                    <p>{title}</p>
                                    <p className="text-[#0DCAF0]">{Math.round(vote_average * 10)}%</p>
                                </CardBody>
                            </Card>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Recommendation;
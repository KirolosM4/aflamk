import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getPersonDetails } from "../Redux/Slices/PersonDetails";
import ErrorGetData from "../component/ErrorGetData";
import axios from "axios";
import {
    Card,
    CardHeader,
    CardBody,
} from "@material-tailwind/react";
const SecondInfoPerson = () => {
    
    const {personDetails:{name,biography},loadingDetailsPerson,errDetailsPerson} = useSelector(reducer=>reducer.personDetailsData);
    const {personId} = useParams();
    const [knownFor,setKnownFor] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getKnowFor = () => {
        axios({
            method:"get",
            url: `https://api.themoviedb.org/3/person/${personId}/combined_credits`,
            params: {language: 'en-US'},
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MDcwOS41NDEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLDzvE3JjpnDnXJp65L2ww7pclm633QVmw5K1JssZEY'
            }
        }).then((res)=>{
            setKnownFor(res.data.cast);
        })
    }
    useEffect(()=>{
        dispatch(getPersonDetails(personId));
        getKnowFor();
    },[personId])
    return(
        loadingDetailsPerson
        ?
        <div className="h-screen bg-black flex justify-center items-center">
            <div className="loader"></div>
        </div>
        :
        errDetailsPerson
        ?
        <ErrorGetData/>
        :
        <div className="p-4 w-full text-white text-center lg:w-[70%] lg:text-left">
            <p className="text-2xl font-bold md:text-3xl">{name}</p>
            <p className="flex flex-col py-7"><span className="text-[#0DCAF0] text-xl font-bold">Biography</span><span>{biography || `We don't have a biography for ${name}`}</span></p>
            <p className="py-7 text-[#0DCAF0] text-xl font-bold">Known For</p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {
                    knownFor.slice(0,3).map(({id,poster_path,title,original_name,media_type})=>(
                        <Card key={id} className="mt-6 bg-[#212529] w-[60%] sm:w-[25%] cursor-pointer" onClick={()=>media_type == "movie" ? navigate(`/movie/${id}/title/${title}`) : navigate(`/series/${id}/title/${original_name}`)}>
                            <CardHeader className="m-0 h-[75%] md:h-[70%] rounded-none shadow-none">
                                {
                                    poster_path == null
                                    ?
                                    <img className="w-full bg-[#212529]" src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="" />    
                                    :
                                    <img
                                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster_path}`}
                                        alt="card-image"
                                        className="object-cover h-full w-full"
                                    />
                                }
                            </CardHeader>
                            <CardBody className="text-white flex flex-col justify-around grow">
                                <p className="text-sm text-center">{media_type == "movie" ? title : original_name}</p>
                            </CardBody>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}

export default SecondInfoPerson;
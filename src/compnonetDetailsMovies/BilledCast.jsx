import { useSelector } from "react-redux";
import {
    Card,
    CardHeader,
    CardBody,
    Button,
} from "@material-tailwind/react";
import {useNavigate, useParams} from "react-router-dom";
import ErrorGetData from "../component/ErrorGetData";
import { FaFacebook,FaTwitter,FaInstagram, } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
const BilledCast = () => {
    const {movieId} = useParams();
    const {creditMovie,loadingCredit,errCredit} = useSelector(reducer=>reducer.movieDetails)
    const {detailsMovie:{status,original_language,budget,revenue}} = useSelector(reducer=>reducer.movieDetails)
    const [keyWords,setKeyWords] = useState([]);
    const [loadingKeyWords,setLoadingKeyWords] = useState(false);
    const [errKeyWords,setErrKeyWords] = useState(false);

    const getKeyWoards = () => {
        setLoadingKeyWords(true);
        axios({
            method:"get",
            url: `https://api.themoviedb.org/3/movie/${movieId}/keywords`,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MDcwOS41NDEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLDzvE3JjpnDnXJp65L2ww7pclm633QVmw5K1JssZEY'
            }
        }).then((res)=>{
            setKeyWords(res.data);
            setLoadingKeyWords(false);
            setErrKeyWords(false)
        }).catch(()=>{
            setLoadingKeyWords(false);
            setErrKeyWords(true)
        })
    }
    
    useEffect(()=>{
        getKeyWoards()
    },[])
    return(
        <div className="p-7">
            <p className="text-2xl py-3 text-[#0DCAF0] font-bold">Top Billed Cast</p>
            {
                loadingCredit
                ?
                <div className="loader"></div>
                :
                errCredit
                ?
                <ErrorGetData/>
                :
                <div className="flex">
                    <div className="w-full h-[55vh] lg:w-[75%]">
                        <div className="overflow-x-scroll flex flex gap-5">
                            {
                                creditMovie?.cast?.slice(0,11).map(({id,name,character,profile_path},index)=>(
                                    <Card key={id} className="bg-[#212529]">
                                        <CardHeader className="m-0 rounded-none shadow-none w-[50vw] md:w-[25vw] lg:w-[15vw]">
                                            <img
                                            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${profile_path}`}
                                            alt="card-image"
                                            className="object-cover h-full w-full"
                                            />
                                        </CardHeader>
                                        <CardBody className="text-white">
                                            <p className="text-lg">{name}</p>
                                            <p className="text-sm">{character}</p>
                                        </CardBody>
                                    </Card>
                                ))
                            }
                        </div>
                        <p className="text-[#0DCAF0] py-2">Full Cast & Crew</p>
                    </div>
                    <div className="grow px-11 text-white text-xl hidden w-[30%] lg:block">
                        <p className="text-[#0DCAF0] text-2xl flex justify-between"><FaFacebook /><FaTwitter /><FaInstagram /><AiOutlineHome /></p>
                        <p className="py-4">Status</p>
                        <p className="text-sm text-[#0DCAF0]">{status}</p>
                        <p className="py-4">Original Language</p>
                        <p className="text-sm text-[#0DCAF0] uppercase">{original_language}</p>
                        <p className="py-4">Budget</p>
                        <p className="text-sm text-[#0DCAF0] uppercase">{budget || "-"}</p>
                        <p className="py-4">Revenue</p>
                        <p className="text-sm text-[#0DCAF0] uppercase">{revenue || "-"}</p>
                        <p className="text-3xl py-3 text-[#0DCAF0] font-bold">Keywords</p>
                        {
                            loadingKeyWords
                            ?
                            <div className="loader"></div>
                            :
                            errKeyWords
                            ?
                            <ErrorGetData/>
                            :
                            keyWords.keywords?.map((keyword)=>(
                                <Button color="white" className="m-1 p-1">{keyword.name}</Button>
                            ))
                        }
                    </div>
                </div>   
            }
        </div>
    )
}

export default BilledCast
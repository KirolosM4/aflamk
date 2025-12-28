import React from "react";
import {Button} from "@material-tailwind/react";
import {useParams} from "react-router-dom";
import ErrorGetData from "../component/ErrorGetData";
import { AiOutlineHome } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetailsSeries } from "../Redux/Slices/DetailsSeriesSlice";
const KeyWordsSeries = () => {
    const {seriesId} = useParams();
    const {detailsSeries:{original_name,status,original_language,homepage,type,networks}} = useSelector(reducer=>reducer.seriesDetails);
    const [keyWords,setKeyWords] = useState([]);
    const [loadingKeyWords,setLoadingKeyWords] = useState(false);
    const [errKeyWords,setErrKeyWords] = useState(false);
    const dispatch = useDispatch();
    const getKeyWoards = () => {
        setLoadingKeyWords(true);
        axios({
            method:"get",
            url: `https://api.themoviedb.org/3/tv/${seriesId}/keywords`,
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
        getKeyWoards();
        dispatch(getDetailsSeries(seriesId));
    },[seriesId])
    return(
        <div className="p-11 text-white text-xl w-full lg:w-[30%]">
            <div className="text-2xl flex justify-around lg:justify-between">
                <Link to={homepage} className="hover:text-blue-700 text-[#0DCAF0]" onClick={()=>!homepage && alert("page not found")}><AiOutlineHome /></Link>
            </div>
            <div className="flex flex-col items-center lg:items-start">
                <p className="py-4">Original Name</p>
                <p className="text-sm text-[#0DCAF0]">{original_name || ""}</p>
                <p className="py-4">Status</p>
                <p className="text-sm text-[#0DCAF0]">{status || ""}</p>
                <p className="py-4">Network</p>
                {networks?.length && <img className="lg:w-[10%] w-[5%]" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${networks[0]?.logo_path}`} alt="network-image"/>}
                <p className="py-4">Type</p>
                <p className="text-sm text-[#0DCAF0]">{type || ""}</p>
                <p className="py-4">Original Language</p>
                <p className="text-sm text-[#0DCAF0] uppercase">{original_language || ""}</p>
            </div>
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
                keyWords.results?.map((keyword)=>(
                    <Button color="white" className="m-1 p-1">{keyword.name}</Button>
                ))
            }
        </div>
    )
}

export default KeyWordsSeries;
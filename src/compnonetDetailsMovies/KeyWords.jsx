import React from "react";
import {Button} from "@material-tailwind/react";
import {useParams} from "react-router-dom";
import ErrorGetData from "../component/ErrorGetData";
import { FaFacebook,FaTwitter,FaInstagram, } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const KeyWords = () => {
    const {movieId} = useParams();
    const {detailsMovie:{status,original_language,budget,revenue,homepage}} = useSelector(reducer=>reducer.movieDetails);
    const [keyWords,setKeyWords] = useState([]);
    const [loadingKeyWords,setLoadingKeyWords] = useState(false);
    const [errKeyWords,setErrKeyWords] = useState(false);
    const [linkPages,setLinkPages] = useState({});
    
    const getLinkPages = () => {
        axios({
            method:"get",
            url: `https://api.themoviedb.org/3/movie/${movieId}/external_ids`,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MDcwOS41NDEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLDzvE3JjpnDnXJp65L2ww7pclm633QVmw5K1JssZEY'
            }
        }).then((res)=>{
            setLinkPages(res.data);
        })
    }
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
        getKeyWoards();
        getLinkPages();
    },[])
    return(
        <div className="p-11 text-white text-xl hidden w-[30%] lg:block">
            <div className="text-2xl flex justify-between">
                <Link to={linkPages.facebook_id && `https://www.facebook.com/${linkPages.facebook_id}`} className="hover:text-blue-700 text-[#0DCAF0]" onClick={()=>!linkPages.facebook_id && alert("page not found")}><FaFacebook /></Link>
                <Link to={linkPages.twitter_id && `https://www.twitter.com/${linkPages.twitter_id}`} className="hover:text-blue-700 text-[#0DCAF0]" onClick={()=>!linkPages.twitter_id && alert("page not found")}><FaTwitter /></Link>
                <Link to={linkPages.twitter_id && `https://www.instagram.com/${linkPages.instagram_id}`} className="hover:text-blue-700 text-[#0DCAF0]" onClick={()=>!linkPages.instagram_id && alert("page not found")}><FaInstagram /></Link>
                <Link to={homepage} className="hover:text-blue-700 text-[#0DCAF0]" onClick={()=>!homepage && alert("page not found")}><AiOutlineHome /></Link>
            </div>
            <p className="py-4">Status</p>
            <p className="text-sm text-[#0DCAF0]">{status || ""}</p>
            <p className="py-4">Original Language</p>
            <p className="text-sm text-[#0DCAF0] uppercase">{original_language || ""}</p>
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
    )
}

export default KeyWords;
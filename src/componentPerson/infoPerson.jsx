import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import { FaFacebook,FaTwitter,FaInstagram,FaTiktok,FaYoutube } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import { getPersonDetails } from "../Redux/Slices/PersonDetails";
import ErrorGetData from "../component/ErrorGetData";
import axios from "axios";
const InfoPerson = () => {
    
    const {personDetails:{profile_path,homepage,known_for_department,gender,birthday,also_known_as,place_of_birth},loadingDetailsPerson,errDetailsPerson} = useSelector(reducer=>reducer.personDetailsData);
    const {personId} = useParams();
    const [linkPages,setLinkPages] = useState({});
    const dispatch = useDispatch();
    const getLinkPages = () => {
        axios({
            method:"get",
            url: `https://api.themoviedb.org/3/person/${personId}/external_ids`,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MDcwOS41NDEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLDzvE3JjpnDnXJp65L2ww7pclm633QVmw5K1JssZEY'
            }
        }).then((res)=>{
            setLinkPages(res.data);
        })
    }

    useEffect(()=>{
        dispatch(getPersonDetails(personId))
        getLinkPages();
    },[])
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
        <div className="w-full items-center px-3 text-left text-white flex flex-col gap-5 lg:items-start lg:w-[30%]">
            <img className="w-1/2 md:w-1/3 lg:w-full rounded py-3" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${profile_path}`} alt="" />
            <div className="text-2xl flex gap-4 py-5">
                <Link to={linkPages.facebook_id && `https://www.facebook.com/${linkPages.facebook_id}`} className="hover:text-blue-700 text-[#0DCAF0]" onClick={()=>!linkPages.facebook_id && alert("page not found")}><FaFacebook /></Link>
                <Link to={linkPages.twitter_id && `https://www.twitter.com/${linkPages.twitter_id}`} className="hover:text-blue-700 text-[#0DCAF0]" onClick={()=>!linkPages.twitter_id && alert("page not found")}><FaTwitter /></Link>
                <Link to={linkPages.instagram_id && `https://www.instagram.com/${linkPages.instagram_id}`} className="hover:text-blue-700 text-[#0DCAF0]" onClick={()=>!linkPages.instagram_id && alert("page not found")}><FaInstagram /></Link>
                <Link to={linkPages.tiktok_id && `https://www.tiktok.com/${linkPages.tiktok_id}`} className="hover:text-blue-700 text-[#0DCAF0]" onClick={()=>!linkPages.tiktok_id && alert("page not found")}><FaTiktok /></Link>
                <Link to={linkPages.youtube_id && `https://www.tiktok.com/${linkPages.youtube_id}`} className="hover:text-blue-700 text-[#0DCAF0]" onClick={()=>!linkPages.youtube_id && alert("page not found")}><FaYoutube /></Link>
                <Link to={homepage} className="hover:text-blue-700 text-[#0DCAF0]" onClick={()=>!homepage && alert("page not found")}><AiOutlineHome /></Link>
            </div>
            <p className="text-center text-2xl font-bold lg:text-left">Personal Info</p>
            <p className="text-center flex flex-col gap-2 lg:text-left">Known For <span className="text-[#0DCAF0]">{known_for_department}</span></p>
            <p className="text-center flex flex-col gap-2 lg:text-left">Known Credits <span className="text-[#0DCAF0]">{also_known_as?.length}</span></p>
            <p className="text-center flex flex-col gap-2 lg:text-left">Gender <span className="text-[#0DCAF0]">{gender == 1 ? "female" : "male"}</span></p>
            <p className="text-center flex flex-col gap-2 lg:text-left">Birthday <span className="text-[#0DCAF0]">{birthday}</span></p>
            <p className="text-center flex flex-col gap-2 lg:text-left">Place of Birth<span className="text-[#0DCAF0]">{place_of_birth}</span></p>
            <p className="text-center flex flex-col gap-2 lg:text-left">Also Known As {also_known_as?.map((also)=>(<span className="text-[#0DCAF0] text-sm">{also}</span>))}</p>
        </div>
    )
}

export default InfoPerson;
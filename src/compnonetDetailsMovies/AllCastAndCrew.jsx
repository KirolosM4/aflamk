import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ErrorGetData from "../component/ErrorGetData"
import { IoIosArrowRoundBack } from "react-icons/io";
import { getCreditsMovie, getDetilsMovie } from "../Redux/Slices/DetailsMovieSlice";
import {
    Card,
    CardHeader,
    CardBody,
} from "@material-tailwind/react";
const AllCastAndCrew = () => {
    const dispatch = useDispatch();
    const {movieId} = useParams();
    const {detailsMovie:{poster_path,release_date,original_title},creditMovie:{cast,crew},loadingMovieDetails,errMovieDetails,loadingCredit,errCredit} = useSelector(reducer=>reducer.movieDetails)
    const date = new Date(release_date).getFullYear();
    const navigate = useNavigate();
    const [groups,setGroups] = useState({});

    useEffect(()=>{
        if(crew){
            const groups = crew.reduce((acc,person)=>{
                const dep = person.department;
                if(!acc[dep]) acc[dep] = [];
                acc[dep].push(person);
                return acc;
            },{});
            setGroups(groups);
            console.log(groups)
        }
    },[crew])

    useEffect(()=>{
        dispatch(getDetilsMovie(movieId));
        dispatch(getCreditsMovie(movieId));
    },[])
    return(
        loadingCredit
        ?
        <div className="flex bg-black py-5 justify-center h-screen items-center">
            <div className="loader"></div>
        </div>        
        :
        errCredit
        ?
        <ErrorGetData/>
        :
        <div className="bg-black">
            <div className="bg-[#212529] text-white">
                <div className="container mx-auto flex items-center gap-5 p-5">
                    <img className="w-[8em]" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`} alt="" />
                    <div>
                        <p className="text-2xl">{original_title} <span className="text-gray-500">({date})</span></p>
                        <p className="text-gray-500 flex gap-3 items-center hover:text-white cursor-pointer" onClick={()=>navigate(-1)}><IoIosArrowRoundBack /> Back to main</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col container mx-auto py-11 lg:grid lg:grid-cols-12">
                <div className="col-start-1 col-span-4 bg-black">
                    <p className="text-2xl py-3 font-bold text-center text-white md:text-left md:text-3xl ">Cast <span className="text-[#0DCAF0]">{cast?.length}</span></p>
                    {
                        cast?.map(({id,profile_path,name,character})=>(
                            <Card key={id} className="bg-[#212529] flex flex-col items-center m-7 rounded-none md:flex-row md:mx-0">
                                <CardHeader className="m-0 rounded-none shadow-none w-[50vw] md:w-[25vw] lg:w-[15vw] bg-gray">
                                    <img
                                    src={profile_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${profile_path}` : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"}
                                    alt="card-image"
                                    className="object-cover h-full w-full"
                                    />
                                </CardHeader>
                                    <CardBody className="text-white grow flex flex-col justify-center gap-2">
                                    <p className="text-xl">{name}</p>
                                    <p className="text-lg text-gray-500">{character}</p>
                                </CardBody>
                            </Card>
                        ))
                    }
                </div>
                <div className="col-start-7 col-span-4 text-white py-7">
                    <p className="text-2xl py-3 font-bold text-center text-white md:text-left md:text-3xl ">Crew <span className="text-[#0DCAF0]">{crew?.length}</span></p>
                    {Object.entries(groups).map(([department, people]) => (
                        <div key={department} className="mb-8">
                            <h2 className="text-3xl text-center font-bold text-[#0DCAF0] mb-4 md:text-left">{department}</h2>
                            {people.map(({id, name,profile_path,job}) => (
                                <Card key={id} className="bg-[#212529] flex flex-col items-center m-7 rounded-none md:flex-row md:mx-0">
                                    <CardHeader className="m-0 rounded-none shadow-none w-[50vw] md:w-[25vw] lg:w-[15vw] bg-gray">
                                        <img
                                        src={profile_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${profile_path}` : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"}
                                        alt="card-image"
                                        className="object-cover h-full w-full"
                                        />
                                    </CardHeader>
                                        <CardBody className="text-white grow flex flex-col justify-center gap-2">
                                        <p className="text-xl">{name}</p>
                                        <p className="text-lg text-gray-500">{job}</p>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    ))}
                </div>

            </div>
            
        </div>
    )
}

export default AllCastAndCrew;



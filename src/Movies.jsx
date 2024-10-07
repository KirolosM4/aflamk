import React, { act, useEffect, useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Rating,
    Button,
    IconButton
  } from "@material-tailwind/react";
  import { Link } from 'react-router-dom';
import WaitingMovies from "./WaitingMovies";
const Movies = () => {
        const [waitingMovie,setWaitingMovie] = useState(false);
        const [active, setActive] = useState(1);
        const next = () => {
            if (active === 500)
              return;
               setActive(active + 1);
          };
          const prev = () => {
            if (active === 1) 
              return;
              setActive(active - 1);
          };
        const [allMovies,setAllMovies] = useState([])
        const getAllMovies = () => {
            const options = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/movie/popular',
                params: {language: 'en-US', page: active},
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODIwNTIyNC44NjE3NjYsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z4X5_ABx-m_YfD2ED8Sf7juxXY-Caucjxzaoa7TRjCw'
                }
              };
              
              axios
                .request(options)
                .then(function (response) {
                  setAllMovies(response.data.results);
                  setWaitingMovie(false)
                })
                .catch(function (error) {
                  console.error(error);
                });
        }
        useEffect(()=>{
            getAllMovies()
        },[active])
    return(
        <div className="bg-black">
            <div className="text-center p-11">
                <p className="styleHeaderWhite">MOVIES</p>
                <p className="styleHeaderWhite">PAGE NUMBER <span className='styleHeaderCyn'>{active}</span> FROM <span className='styleHeaderCyn'>500</span> </p>
            </div>
            
            <div className="flex flex-col items-center justify-center w-screen">
                {waitingMovie ? <WaitingMovies/> :
                <div className='container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center my-7 p-7 w-full gap-11'>
                    {allMovies.map(({poster_path,title,vote_average}, index) => (
                        <Card className="w-full h-[32em] overflow-hidden  bg-[#212529]" key={index}>
                            <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="m-0 rounded-none h-[70%]"
                            >
                            <img
                                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`}
                                alt="ui/ux review check"
                                className='w-full h-full'
                            />
                            </CardHeader>
                            <CardBody className='h-[35%] pt-5 py-5 flex flex-col pb-0 justify-center'>
                            <Typography variant="p" className='text-white lg:text-2xl'>
                                TITLE : {title}
                            </Typography>
                            <Typography variant="lead" color="gray" className="mt-3 font-normal flex flex-col justify-between lg:flex-row  items-center ">
                                <p className='text-cyan-400'>Rate : {vote_average}</p>
                                <Rating value={Math.round(vote_average * 0.5)} />
                            </Typography>
                            </CardBody>
                            <CardFooter className="flex justify-center mb-5  items-center h-[10%] w-full">
                            <Button variant='outlined' color='cyan'>
                                <Link to="">DETAILS</Link>
                            </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
}
                <div className="flex justify-center items-center gap-8 text-white">
                    <IconButton
                        size="sm"
                        variant="outlined"
                        onClick={prev}
                        disabled={active === 1}
                        className="text-white"
                    >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 text-white" />
                    </IconButton>
                    <Typography color="gray" className="font-normal text-white">
                        <span>Page </span> 
                        <strong className="text-white-900">{active}</strong> of{" "}
                        <strong className="text-white">500</strong>
                    </Typography>
                    <IconButton
                        size="sm"
                        variant="outlined"
                        onClick={()=>{next();setWaitingMovie(true)}}
                        disabled={active === 500}
                        className="text-white"
                    >
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Movies
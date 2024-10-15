import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardBody, CardFooter, Typography, Rating, Button } from "@material-tailwind/react";
import { Link, useLocation } from 'react-router-dom';
import { getSearch } from '../../redux/Slice/SearchSlice';


const SearchMovies = () => {
 const dispatch=useDispatch()
  const{searchMovies}=useSelector(state=>state.mySearch)
 const Location=useLocation()
 const queryParams=new URLSearchParams(Location.search)
 const query=queryParams.get("query")||""
 const filteredMovies=searchMovies.filter(movie=>
  movie.title.toLowerCase().includes(query.toLowerCase())
 )
 useEffect(() => {
    
  if (query) {
    dispatch(getSearch(query)); 
  }
}, [dispatch, query]);
  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center mt-7 p-7 w-full gap-11">
        {filteredMovies.map(({ poster_path, title, vote_average, id }, index) => (
          <Card className="w-full h-[32em] overflow-hidden bg-[#212529]" key={index}>
            <CardHeader floated={false} shadow={false} color="transparent" className="m-0 rounded-none h-[70%]">
              <img
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`}
                alt={title}
                className="w-full h-full"
              />
            </CardHeader>
            <CardBody className="h-[35%] pt-5 py-5 flex flex-col pb-0 justify-center">
              <Typography variant="p" className="text-white text-xl lg:text-2xl">
                TITLE: {title}
              </Typography>
              <Typography variant="lead" color="gray" className="mt-3 font-normal flex flex-col justify-between lg:flex-row items-center">
                <p className="text-cyan-400">Rate: {vote_average}</p>
                <Rating value={Math.round(vote_average * 0.5)} />
              </Typography>
            </CardBody>
            <CardFooter className="flex justify-center mb-5 items-center h-[10%] w-full">
              <Button variant="outlined" color="cyan">
           
                <Link to={`/moviesdetails/${id}`}>DETAILS</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default SearchMovies
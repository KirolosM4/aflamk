import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
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
import { MdKeyboardArrowLeft,MdKeyboardDoubleArrowLeft,MdKeyboardArrowRight,MdKeyboardDoubleArrowRight  } from "react-icons/md";
import { getAllMovies, next, prev, resetNext, resetPrev } from "./redux/Slice/allMoviesSlice";

const AllMovies = () => {
        const {allMovies} = useSelector(state => state.myAllMovies);
        const {waitingMovie} = useSelector(state=>state.myAllMovies);
        const {active} = useSelector(state => state.myAllMovies)
        const dispatch = useDispatch();
        useEffect(()=>{
            dispatch(getAllMovies(active))
        },[active])
    return(
        <div>
            <div className="text-center p-11">
                <p className="styleHeaderWhite">MOVIES</p>
                <p className="styleHeaderWhite">PAGE NUMBER <span className='styleHeaderCyn'>{active}</span> FROM <span className='styleHeaderCyn'>500</span> </p>
            </div>
            
            <div className="md:px-14 flex flex-col items-center justify-center w-screen">
                { waitingMovie ? <WaitingMovies className="h-screen"/> :
                <div className='container grid grid-cols-1 px-8 w-[80%] md:w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center my-7 p-7 w-full gap-11'>
                    {allMovies.map(({poster_path,title,vote_average,id}, index) => (
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
                            <Typography variant="p" className='text-white text-center md:text-left lg:text-2xl'>
                                TITLE : {title}
                            </Typography>
                            <Typography variant="lead" color="gray" className="mt-3 font-normal flex flex-col justify-between lg:flex-row  items-center ">
                                <p className='text-cyan-400 text-xl md:text-xl'>Rate : {vote_average}</p>
                                <Rating value={Math.round(vote_average * 0.5)} />
                            </Typography>
                            </CardBody>
                            <CardFooter className="flex justify-center mb-5  items-center h-[10%] w-full">
                            <Link to={`/moviesdetails/${id}`}>  <Button variant='outlined' color='cyan'>
                              DETAILS
                            </Button></Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
}
                <div className="flex text-blue-500 rounded bg-white">
                    <IconButton
                        size="sm"
                        onClick={()=>dispatch(resetNext())}
                        disabled={active === 1}
                        className="text-blue-700 text-xl rounded-none"
                    >
                        <MdKeyboardDoubleArrowLeft />
                    </IconButton>
                    <IconButton
                        size="sm"
                        onClick={()=>dispatch(prev())}
                        disabled={active === 1}
                        className="text-blue-700 text-xl rounded-none"
                    >
                        <MdKeyboardArrowLeft />
                    </IconButton>
                    <Typography as={"div"} className="flex items-center px-4 bg-gray-900">
                        <p>{active}</p>
                    </Typography>
                    <IconButton
                        size="sm"
                        onClick={()=>dispatch(next())}
                        disabled={active === 500}
                        className="text-blue-700 text-xl rounded-none"
                    >
                        <MdKeyboardArrowRight />
                    </IconButton>
                    <IconButton
                        size="sm"
                        onClick={()=>dispatch(resetPrev())}
                        disabled={active === 500}
                        className="text-blue-700 text-xl rounded-none"
                    >
                        <MdKeyboardDoubleArrowRight />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default AllMovies;
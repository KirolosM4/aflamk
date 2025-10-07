import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopSeries } from "../Redux/Slices/HomeSlice";
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Rating,
} from "@material-tailwind/react";
const TopSeries = () => {
    const dispatch = useDispatch();
    const {topSeries,loadingTopSeries,errorTopSeries} = useSelector(reducer=>reducer.HomeRedu)
    useEffect(()=>{
        dispatch(getTopSeries())
    },[])
    return(
        <div className="container mx-auto flex flex-col">
            <p className="text-3xl font-bold text-[#0DCAF0] py-11 text-center md:text-4xl md:text-left">TOP SERIES</p>
            {
                loadingTopSeries
                ?
                <div className="loader self-center"></div>
                :
                errorTopSeries
                ?
                <p className="text-red-500 text-3xl text-center">try again later 🙁</p>
                :
                <div className=" grid grid-cols-1 justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {
                        topSeries.map(({id,poster_path,name,vote_average})=>(
                            <Card key={id} className="mt-6 w-[75%] bg-[#212529] md:w-[95%]">
                                <CardHeader color="blue-gray" className="m-0 h-[75%] md:h-[70%] rounded-none shadow-none">
                                    <img
                                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster_path}`}
                                    alt="card-image"
                                    className="object-cover h-full w-full"
                                    />
                                </CardHeader>
                                <CardBody className="text-white flex flex-col justify-around grow">
                                    <p className="text-xl">TITLE : {name}</p>
                                    <p className="flex flex-wrap justify-between"><span>RATE: <span className="text-[#0DCAF0]">{vote_average}</span></span><span><Rating value={Math.floor(vote_average/2)} readonly/></span></p>
                                    <Button className="py-3 px-4 w-fit text-[#0DCAF0] bg-[#212529] self-center hover:bg-[#0DCAF0] hover:text-[#212529] border-[#0DCAF0]" variant="outlined" color="white">DETAILS</Button>
                                </CardBody>
                            </Card>
                        ))
                    }
                </div>
            }

        </div>
    )
}

export default TopSeries;

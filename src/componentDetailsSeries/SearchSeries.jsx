import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Rating,
} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
const SearchSeries = () => {
    const navigate = useNavigate();
    const {searchList} = useSelector(reducer=>reducer.searchData);
    const [newSearch,setNewSearch] = useState([])
    useEffect(()=>{
        setNewSearch(searchList);
    },[window.location.href])
    return(
        <div className={`bg-black text-white py-3 ${searchList.length == 0 && "h-screen"}`}>
            <p className="text-2xl my-3 font-bold text-center md:text-3xl text-[#0DCAF0]">SEARCH IN SERIES</p>
            <div className={`container mx-auto flex flex-col`}>
                {
                    <div className="py-4 grid grid-cols-1 justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {
                            newSearch.map(({id,poster_path,name,vote_average})=>(
                                <Card key={id} className="mt-6 w-[75%] bg-[#212529] md:w-[95%]">
                                    <CardHeader className="m-0 h-[75%] md:h-[70%] rounded-none shadow-none">
                                        {
                                            poster_path == null
                                            ?
                                            <img className="bg-[#212529] w-full h-full" src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="" />    
                                            :
                                            <img
                                                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster_path}`}
                                                alt="card-image"
                                                className="object-cover h-full w-full"
                                            />
                                        }
                                    </CardHeader>
                                    <CardBody className="text-white flex flex-col justify-around grow">
                                        <p className="text-xl">TITLE : {name}</p>
                                        <div className="flex flex-wrap justify-between">
                                            <span>RATE: <span className="text-[#0DCAF0]">{vote_average}</span></span>
                                            <Rating value={Math.floor(vote_average/2)} readonly/>
                                        </div>
                                        <Button className="py-3 px-4 w-fit text-[#0DCAF0] bg-[#212529] self-center hover:bg-[#0DCAF0] hover:text-[#212529] border-[#0DCAF0]" variant="outlined" color="white" onClick={()=>navigate(`/series/${id}/title/${name}`)}>DETAILS</Button>
                                    </CardBody>
                                </Card>
                            ))
                        }
                    </div>
                }

            </div>
        </div>
    )
}

export default SearchSeries;
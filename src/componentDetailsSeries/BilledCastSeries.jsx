import { useSelector } from "react-redux";
import {
    Card,
    CardHeader,
    CardBody,
} from "@material-tailwind/react";
import ErrorGetData from "../component/ErrorGetData";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const BilledCastSeries = () => {
    const navigate = useNavigate();
    const {creditSeries,loadingCredit,errCredit} = useSelector(reducer=>reducer.seriesDetails);
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
                <div className={`${(creditSeries?.cast?.length > 5 || window.innerWidth < 600) && "overflow-x-scroll"} flex flex gap-5`}>
                    {
                        creditSeries?.cast?.slice(0,11).map(({id,name,character,profile_path},index)=>(
                            <Card key={id} className="bg-[#212529] flex flex-col justify-between">
                                {
                                    index < 10
                                    ?
                                    <>
                                        <CardHeader className="m-0 rounded-none shadow-none w-[50vw] md:w-[25vw] lg:w-[15vw] bg-gray">
                                            <img
                                            src={profile_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${profile_path}` : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"}
                                            alt="card-image"
                                            className="object-cover h-full w-full"
                                            />
                                        </CardHeader>
                                        <CardBody className="text-white">
                                            <p className="text-lg">{name}</p>
                                            <p className="text-sm">{character}</p>
                                        </CardBody>
                                    </>
                                    :
                                    <p className="text-white w-[50vw] md:w-[25vw] lg:w-[15vw] flex justify-center items-center h-full gap-3 cursor-pointer" onClick={()=>navigate("cast")}>Show More <FaArrowRightLong /> </p>
                                }
                            </Card>
                        ))
                    }
                </div>
            }
            <p className="text-[#0DCAF0] py-2 text-center md:text-left cursor-pointer" onClick={()=>navigate("cast")}>Full Cast & Crew</p>
        </div>
    )
}

export default BilledCastSeries
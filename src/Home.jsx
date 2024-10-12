import React from "react";
import {Button } from "@material-tailwind/react";
import HeaderNav from "./component/HeaderNav";
import MoviesCarousal from "./component/componentHome/MoviesCarousal";
import SeriesCarousal from "./component/componentHome/SeriesCarousal";
import TopMovies from "./component/componentHome/TopMovies";
import TopSeries from "./component/componentHome/TopSeries";
import Footer from "./component/Footer";
const Home = () => {
    return(
            <div className="h-content w-screen h-full">
                <div className="w-screen mb-14">
                        <div className="w-full text-center p-5">
                            <p className="styleHeaderCyn">Home</p>
                        </div>
                        <div className="flex flex-col justify-between  lg:flex-row lg:items-center  mx-8 px-8">
                            <div className="text-center">
                                <p className="styleHeaderWhite">SORT BY</p>
                                <div className="flex flex-wrap justify-center gap-3 md:gap-11">
                                    <Button variant="outlined" color="white" className="styleButtonHover hover:opacity-100">Title</Button>
                                    <Button variant="outlined" color="white" className="styleButtonHover hover:opacity-100">Poplarity</Button>
                                    <Button variant="outlined" color="white" className="styleButtonHover hover:opacity-100">Date</Button>
                                    <Button variant="outlined" color="white" className="styleButtonHover hover:opacity-100">Ratin</Button>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="styleHeaderWhite">SORT ORDER</p>
                                <div className="flex flex-wrap justify-center gap-3 md:gap-11">
                                    <Button variant="outlined" color="white" className="styleButtonHover hover:opacity-100">Descidngin</Button>
                                    <Button variant="outlined" color="white" className="styleButtonHover hover:opacity-100">Ascending</Button>
                                </div>
                            </div>
                        </div>
                </div>
                <MoviesCarousal/>
                <SeriesCarousal/>
                <TopMovies/>
                <TopSeries/>
            </div>
    )
}

export default Home;

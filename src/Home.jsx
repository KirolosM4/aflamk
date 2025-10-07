import React, { useEffect } from "react";
import HeaderHome from "./componentHome/HeaderHome";
import NowPlayingMovies from "./componentHome/NowPlayingMovies";
import NowPlayingSeries from "./componentHome/NowPlayingSeries";
import TopMovies from "./componentHome/TopMovies";
import TopSeries from "./componentHome/TopSeries";


const Home = () => {
    return(
        <div className="bg-black py-5">
            <HeaderHome/>
            <NowPlayingMovies/>
            <NowPlayingSeries/>
            <TopMovies/>
            <TopSeries/>
        </div>
    )
}
export default Home;
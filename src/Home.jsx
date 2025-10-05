import React, { useEffect } from "react";
import HeaderHome from "./componentHome/HeaderHome";
import NowPlayingMovies from "./componentHome/NowPlayingMovies";
import NowPlayingSeries from "./componentHome/NowPlayingSeries";


const Home = () => {
    return(
        <div className="bg-black py-5">
            <HeaderHome/>
            <NowPlayingMovies/>
            <NowPlayingSeries/>
        </div>
    )
}
export default Home;
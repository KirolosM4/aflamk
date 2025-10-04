import React, { useEffect } from "react";
import HeaderHome from "./componentHome/HeaderHome";
import NowPlayingMovie from "./componentHome/NowPlayingMovies";


const Home = () => {
    return(
        <div className="bg-black py-5">
            <HeaderHome/>
            <NowPlayingMovie/>
        </div>
    )
}
export default Home;
import React from "react";
import MovieDetails from "./compnonetDetailsMovies/movieDetails";
import BilledCast from "./compnonetDetailsMovies/BilledCast";
import Social from "./compnonetDetailsMovies/Social";
import KeyWords from "./compnonetDetailsMovies/KeyWords";
import Recommendation from "./compnonetDetailsMovies/Recommendation";
import Media from "./compnonetDetailsMovies/Media";
const DetailsMovies = () => {
    return(
        <div className="bg-black">
            <MovieDetails/>
            <div className="flex">
                <div className="w-full lg:w-[75%]">
                    <BilledCast/>
                    <Social/>
                    <Media/>
                    <Recommendation/>
                </div>
                <KeyWords/>
            </div>
        </div>
    )
}

export default DetailsMovies;
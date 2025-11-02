import React from "react";
import MovieDetails from "./compnonetDetailsMovies/movieDetails";
import BilledCast from "./compnonetDetailsMovies/BilledCast";
import Social from "./compnonetDetailsMovies/Social";
import KeyWords from "./compnonetDetailsMovies/keyWords";
const DetailsMovies = () => {
    return(
        <div className="bg-black">
            <MovieDetails/>
            <div className="flex">
                <div className="w-full lg:w-[75%]">
                    <BilledCast/>
                    <Social/>
                </div>
                <KeyWords/>
            </div>
        </div>
    )
}

export default DetailsMovies;
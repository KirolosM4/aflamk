import React from "react";
import MovieDetails from "./compnonetDetailsMovies/movieDetails";
import BilledCast from "./compnonetDetailsMovies/BilledCast";

const DetailsMovies = () => {
    return(
        <div className="bg-black">
            <MovieDetails/>
            <BilledCast/>
        </div>
    )
}

export default DetailsMovies;
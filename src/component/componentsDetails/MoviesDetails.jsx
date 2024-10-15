import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMoviesDetails } from "../../redux/Slice/allMoviesSlice";
import { useParams, Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const MoviesDetails = () => {
  const { movieDetails, loading, error } = useSelector(
    (state) => state.myAllMovies
  );
  const dispatch = useDispatch();
  const { movieId } = useParams();

  useEffect(() => {
    if (movieId) {
      dispatch(getMoviesDetails(movieId));
    }
  }, [dispatch, movieId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div
      className="relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movieDetails?.backdrop_path})`,
        backgroundSize: "cover",
        zIndex: 1,
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <div className="bg-black bg-opacity-60 h-full w-full flex flex-col justify-center items-center p-4 md:p-8">
        {movieDetails ? (
          <>
            <div className="flex flex-col md:flex-row items-center w-full max-w-5xl">
              <div className="p-4 w-full md:w-1/3 flex justify-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                  alt={movieDetails.title}
                  className="rounded-lg shadow-lg w-full md:w-80"
                />
              </div>

              <div className="text-left p-4 w-full md:w-2/3">
                <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center md:text-left">
                  {movieDetails.title} ({movieDetails.release_date.slice(0, 4)})
                </h1>
                <p className="text-sm md:text-lg mb-4">
                  {movieDetails.overview}
                </p>

                <h2 className="text-lg md:text-2xl font-semibold mb-2">
                  Casting:
                </h2>
                <ul className="list-none text-sm md:text-lg mb-4">
                  <li>Michael Keaton (Acting)</li>
                  <li>Winona Ryder (Acting)</li>
                  <li>Tim Burton (Directing)</li>
                </ul>

                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div>
                    <h3 className="text-lg md:text-xl">
                      Rating:{" "}
                      {movieDetails.vote_average > 8 ? "⭐⭐⭐" : "⭐⭐"}
                    </h3>
                  </div>
                  <button className="bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-600">
                    Add to Watchlist
                  </button>
                  <button className="bg-red-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-600">
                    Play Trailer
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link to="/">
                <button className="bg-gray-700 px-6 py-2 rounded-lg text-white font-semibold hover:bg-gray-800">
                  Back a Step
                </button>
              </Link>
            </div>
          </>
        ) : (
          <p>No details found for this movie.</p>
        )}
      </div>
    </div>
  );
};

export default MoviesDetails;

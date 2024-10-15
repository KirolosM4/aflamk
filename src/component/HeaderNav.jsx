import React, { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { FaListUl } from "react-icons/fa";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearch, getSearchSeries } from "../redux/Slice/SearchSlice";

const HeaderNav = () => {
  const [inputSearch, setInputSearch] = useState("");

  const searchResults = useSelector((state) => state.mySearch.searchMovies);
  const searchResultsSeries = useSelector(
    (state) => state.mySearch.searchSeries
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputSearch = (e) => {
    const query = e.target.value;
    setInputSearch(query);
    if (query.trim() !== "") {
      dispatch(getSearch(query));
      dispatch(getSearchSeries(query));
    }
  };

  const handleSearchMovies = () => {
    if (inputSearch.trim()) {
      navigate("/searchmovies");
    }
  };

  const handleSearchSeries = () => {
    if (inputSearch.trim()) {
      navigate(`/searchseries?query=${inputSearch}`); 
    }
  };

  const filteredMovies = searchResults.filter((movie) =>
    movie.title.toLowerCase().startsWith(inputSearch.toLowerCase())
  );

  const filteredSeries = searchResultsSeries.filter((series) =>
    series.name.toLowerCase().startsWith(inputSearch.toLowerCase())
  );

  const NavList = () => {
    return (
      <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-3">
        <Typography
          as={NavLink}
          variant="small"
          color="blue-gray"
          className="p-1 text-[#b7bcbf] hover:text-[#d9dadb] transition-colors font-medium"
          to="/"
        >
          Home
        </Typography>
        <Typography
          as={NavLink}
          variant="small"
          color="blue-gray"
          className="p-1 text-[#b7bcbf] hover:text-[#d9dadb] transition-colors font-medium"
          to="/Movies"
        >
          Movies
        </Typography>
        <Typography
          as={NavLink}
          variant="small"
          color="blue-gray"
          className="p-1 text-[#b7bcbf] hover:text-[#d9dadb] transition-colors font-medium"
          to="/Series"
        >
          Series
        </Typography>
        <Typography
          as={NavLink}
          variant="small"
          color="blue-gray"
          className="p-1 text-[#b7bcbf] hover:text-[#d9dadb] transition-colors font-medium"
          to="/ContactUs"
        >
          Contact Us
        </Typography>
      </ul>
    );
  };

  const [openNav, setOpenNav] = useState(false);
  const handleWindowResize = () => {
    window.innerWidth >= 960 && setOpenNav(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="max-w-screen-3xl bg-[#212529] rounded-none border-none px-11 py-3 relative z-50">
      <div className="flex items-center justify-between gap-8">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          Redux Movies
        </Typography>
        <div className="lg:flex hidden grow justify-between">
          <NavList />
          <div className="relative flex gap-2">
            <Input
              label="search"
              value={inputSearch}
              onChange={handleInputSearch}
              className="bg-white"
            />

            {inputSearch && filteredMovies.length > 0 && (
              <div
                className="absolute top-full mt-1 w-full max-h-60 overflow-y-auto text-light-blue-700 bg-gray-900 rounded-lg shadow-md"
                style={{ zIndex: 1000 }}
              >
                <ul className="space-y-2 p-2">
                  {filteredMovies.map((movie) => (
                    <Link
                      key={movie.id}
                      to={`/moviesdetails/${movie.id}`}
                      className="text-white"
                    >
                      <li className="p-2 bg-gray-600 hover:bg-gray-100 cursor-pointer border-b last:border-none flex items-center">
                        <img
                          src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
                          alt={movie.title}
                          className="w-12 h-auto mr-4 rounded-md"
                        />
                        {movie.title}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}

            {inputSearch && filteredSeries.length > 0 && (
              <div
                className="absolute top-full mt-1 w-full max-h-60 overflow-y-auto text-light-blue-700 bg-gray-900 rounded-lg shadow-md"
                style={{ zIndex: 1000 }}
              >
                <ul className="space-y-2 p-2">
                  {filteredSeries.map((series) => (
                    <Link
                      key={series.id}
                      to={`/seriesdetails/${series.id}`}
                      className="text-light-blue-700"
                    >
                      <li className="p-2 bg-gray-600 hover:bg-gray-100 cursor-pointer border-b last:border-none flex items-center">
                        <img
                          src={`https://image.tmdb.org/t/p/w92/${series.poster_path}`}
                          alt={series.title}
                          className="w-12 h-auto mr-4 rounded-md"
                        />
                        {series.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}

            <Button
              variant="outlined"
              color="green"
              className="hover:bg-green-500 hover:text-white"
              disabled={!inputSearch.trim()}
              onClick={handleSearchMovies}
            >
              Search Movies
            </Button>
            <Button
              variant="outlined"
              color="red"
              className="hover:bg-red-500 hover:text-white"
              disabled={!inputSearch.trim()}
              onClick={handleSearchSeries}
            >
              Search Series
            </Button>

            <Button
              variant="outlined"
              color="blue"
              className="hover:bg-blue-500 hover:text-white"
            >
              Login
            </Button>
          </div>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          <FaListUl className="h-6 w-6" strokeWidth={2} />
        </IconButton>
      </div>
    </Navbar>
  );
};

export default HeaderNav;

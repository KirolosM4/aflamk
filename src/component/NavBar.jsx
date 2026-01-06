import React, { useEffect, useState } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
    Input,
    Button
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {NavLink, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getSearch } from "../Redux/Slices/SearchSlice";

function NavList({dispatch,navigate,SearchList,setTypeSearch,typeSearch, word,setWord}) {
    return (
        <div className="container mx-auto flex flex-col lg:items-center lg:flex-row justify-between">
            <ul className="my-2 flex flex-col gap-2 text-gray-500 lg:mb-0 lg:mt-0 lg:flex-row lg:gap-3">
                <Typography
                    as={NavLink}
                    variant="small"
                    className="p-1 font-medium hover:text-gray-300"
                    to="/"
                >
                    Home
                </Typography>
                <Typography
                    as={NavLink}
                    variant="small"
                    className="p-1 font-medium hover:text-gray-300"
                    to="/movies"
                >
                    Movies
                </Typography>
                <Typography
                    as={NavLink}
                    variant="small"
                    className="p-1 font-medium hover:text-gray-300"
                    to="/series"
                >
                    Series
                </Typography>
                <Typography
                    as={NavLink}
                    variant="small"
                    className="p-1 font-medium hover:text-gray-300"
                    to="contactus"
                >
                    ContactUs
                </Typography>
            </ul>
            <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 md:flex-row lg:gap-3">
                <Typography
                    as="li"
                >
                    <Input label="Username" className="bg-white" value={word}  onChange={(e)=>{dispatch(getSearch([e.target.value,typeSearch])),setWord(e.target.value)}} />
                </Typography>
                <Typography
                    as="li"
                >
                    <Button variant="outlined" color="green" className="hover:bg-green-500 hover:text-white py-3 px-4 w-full" disabled={!word.length} onClick={()=>{typeSearch == "movies" ? navigate(`search/${word}/in/movies`) : navigate(`search/${word}/in/series`),setWord("")}}>Search</Button>
                </Typography>
                <Typography
                    as="li"
                >
                    {typeSearch == "movies" ? <Button variant="outlined" color="red" className="hover:bg-red-500 hover:text-white py-3 px-4 w-full" onClick={()=>{setTypeSearch("series"),setWord("")}}>Search Series</Button> :<Button variant="outlined" color="blue" className="hover:bg-blue-500 hover:text-white py-3 px-4 w-full" onClick={()=>{setTypeSearch("movies"),setWord("")}}>Search Movies</Button>}
                </Typography>
                <Typography
                    as="li"
                >
                    <Button variant="outlined" color="cyan" className="hover:bg-cyan-500 hover:text-white py-3 px-4 w-full">LogIn</Button>
                </Typography>
                {word.length > 0 && <SearchList/>}
            </ul>
        </div>
    );
}

const MainNav =  () => {
    const navigate = useNavigate();
    const [word,setWord] = useState("");
    const [typeSearch,setTypeSearch] = useState("movie");
    const {searchList} = useSelector(reducer=>reducer.searchData);
    const dispatch = useDispatch();
    const [openNav, setOpenNav] = useState(false);
    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);
    
    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
    
        return () => {
        window.removeEventListener("resize", handleWindowResize);
        };
    }, []);
    
    const SearchList = () => {
    return (
        <div className="relative h-[30vh] md:absolute md:right-[20%] md:top-[10vh] bg-[#212529] text-white md:w-[30%] md:h-[40vh] overflow-y-auto shadow-lg rounded z-[999]">
        {searchList?.map(({original_title,poster_path,id,original_name}) => (
            <div key={id} className="flex justify-between items-center p-2 border-b border-[#0DCAF0] hover:bg-purple-700 hover:scale-[0.9] transition-all duration-500" onClick={()=> {typeSearch == "movies" ? navigate(`movie/${id}/title/${original_title}`) : navigate(`series/${id}/title/${original_name}`),setWord("")}}>
                <img className="w-[30px] h-[30px] rounded-full" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`} alt="" />
                <p className="p-2 text-sm">{typeSearch == "movies" ? original_title : original_name}</p>
            </div>
        ))}
        </div>
    );
    };
    return (
        <Navbar className="mx-auto max-w-screen-3xl px-6 py-3 bg-[#212529] bg-opacity-100 rounded-none border-0 relative z-[100]">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900 text-white">
                <Typography
                as="a"
                href="#"
                variant="h6"
                className="mr-4 cursor-pointer py-1.5"
                >
                    AFLAMK
                </Typography>
                <div className="hidden lg:block grow">
                    <NavList navigate={navigate} dispatch={dispatch} word={word} setWord={setWord} SearchList={SearchList} setTypeSearch={setTypeSearch} typeSearch={typeSearch}/>
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                    >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList dispatch={dispatch} word={word} setWord={setWord}  navigate={navigate} SearchList={SearchList} setTypeSearch={setTypeSearch} typeSearch={typeSearch}/>
            </Collapse>
        </Navbar>
    );
}

export default MainNav;


import React, { useEffect,useState } from "react";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Input,
    Collapse,

} from "@material-tailwind/react";
import { FaListUl } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const HeaderNav = () => {
    const NavList = () => {
        return (
            <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-3">
                <Typography
                    as={NavLink}
                    variant="small"
                    color="blue-gray"
                    className="p-1 text-[#b7bcbf] hover:text-[#d9dadb]  transition-colors font-medium"
                    to="/"
                >
                    Home
                </Typography>
                <Typography
                    as={NavLink}
                    variant="small"
                    color="blue-gray"
                    className="p-1 text-[#b7bcbf] hover:text-[#d9dadb]  transition-colors font-medium"
                    to="/Movies"
                >
                    Movies
                </Typography>
                <Typography
                    as={NavLink}
                    variant="small"
                    color="blue-gray"
                    className="p-1 text-[#b7bcbf] hover:text-[#d9dadb]  transition-colors font-medium"
                    to="/Series"
                >
                    Series
                </Typography>
                <Typography
                    as={NavLink}
                    variant="small"
                    color="blue-gray"
                    className="p-1 text-[#b7bcbf] hover:text-[#d9dadb]  transition-colors font-medium"
                    to="/ContactUs"
                >
                    Contact Us
                </Typography>
            </ul>
        );
    }
    const [openNav, setOpenNav] = useState(false);
    const handleWindowResize = () =>{
        window.innerWidth >= 960 && setOpenNav(false);
    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => {
        window.removeEventListener("resize", handleWindowResize);
        };
    }, [])};
    return (
        <Navbar className="max-w-screen-3xl bg-[#212529] rounded-none border-none  px-11 py-3">
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
                    <div className="flex gap-2">
                        <Input label="search"  className="bg-white"/>
                        <Button variant="outlined" color="green" className="hover:bg-green-500 hover:text-white">Search</Button>
                        <Button variant="outlined" color="red" className="hover:bg-red-500 hover:text-white w-full">Search Series</Button>
                        <Button variant="outlined" color="blue" className="hover:bg-blue-500 hover:text-white">Login</Button>
                    </div>
                </div>
                <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
                >
                {openNav ? (
                    <FaListUl className="h-6 w-6" strokeWidth={2} />
                ) : (
                    <FaListUl className="h-6 w-6" strokeWidth={2} />
                )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
                <div className="flex flex-wrap gap-2">
                        <Input label="search"  className="bg-white"/>
                        <Button variant="outlined" color="green" className="hover:bg-green-500 hover:text-white w-full">Search</Button>
                        <Button variant="outlined" color="red" className="hover:bg-red-500 hover:text-white w-full">Search Series</Button>
                        <Button variant="outlined" color="blue" className="hover:bg-blue-500 hover:text-white w-full">Login</Button>
                </div>
            </Collapse>
        </Navbar>
    );
}
export default HeaderNav;
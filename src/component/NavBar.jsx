import React, { useState } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {NavLink} from "react-router-dom"
function NavList() {
    return (
        <ul className="container mx-auto my-2 flex flex-col gap-2 text-gray-500 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as={NavLink}
                variant="small"
                className="p-1 font-medium hover:text-gray-300"
                to="/"
            >
                Pages
            </Typography>
            <Typography
                as={NavLink}
                variant="small"
                className="p-1 font-medium hover:text-gray-300"
                to="/movies"
            >
                Account
            </Typography>
            <Typography
                as={NavLink}
                variant="small"
                className="p-1 font-medium hover:text-gray-300"
                to="/series"
            >
                Blocks
            </Typography>
            <Typography
                as={NavLink}
                variant="small"
                className="p-1 font-medium hover:text-gray-300"
                to="contactus"
            >
                Docs
            </Typography>
        </ul>
    );
}

const MainNav =  () => {
    const [openNav, setOpenNav] = useState(false);
    
    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);
    
    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
    
        return () => {
        window.removeEventListener("resize", handleWindowResize);
        };
    }, []);
    
    return (
        <Navbar className="mx-auto max-w-screen-3xl px-6 py-3 bg-[#212529] rounded-none border-0">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900 text-white">
                <Typography
                as="a"
                href="#"
                variant="h6"
                className="mr-4 cursor-pointer py-1.5"
                >
                    AFLAMK
                </Typography>
                <div className="hidden lg:block">
                    <NavList />
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
                <NavList />
            </Collapse>
        </Navbar>
    );
}

export default MainNav;


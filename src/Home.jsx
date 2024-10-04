import React from "react";
import { NavLink } from "react-router-dom";
import { Input,Button } from "@material-tailwind/react";
import HeaderNav from "./component/HeaderNav";

const Home = () => {
    return(
        <div className="h-screen">
           <HeaderNav/>
        </div>
    )
}

export default Home;


//  {/* header  */}
//  <div>
//  {/* headerNav */}
//  <div className="flex justify-between items-center px-10 py-2 bg-[#212529] text-white">
//      <div className="flex gap-7">
//          <NavLink>Redux Movies</NavLink>
//          <NavLink>Home</NavLink>
//          <NavLink>Movies</NavLink>
//          <NavLink>Series</NavLink>
//          <NavLink>Contact Us</NavLink>
//      </div>
//      <div className="flex items-center gap-5">
//          <Input label="search"  className="bg-white"/>
//          <Button variant="outlined" color="green" className="hover:bg-green-500 hover:text-white">Search</Button>
//          <Button variant="outlined" color="red" className="hover:bg-red-500 hover:text-white w-full">Search Series</Button>
//          <Button variant="outlined" color="blue" className="hover:bg-blue-500 hover:text-white">Login</Button>
//          </div>
//      </div>
//  {/* headerBody */}
//  <div></div>
// </div>
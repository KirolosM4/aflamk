import React from "react";
import {Button } from "@material-tailwind/react";
import HeaderNav from "./component/HeaderNav";

const Home = () => {
    return(
        <div className="h-screen bg-black">
           <HeaderNav/>
           <div className="w-screen">
                <div className="w-full text-center p-5">
                    <p className="styleHeaderCyn">Home</p>
                </div>
                <div className="flex justify-between mx-8 px-8">
                    <div className="text-center">
                        <p className="styleHeaderWhite">SORT BY</p>
                        <div className="flex gap-11">
                            <Button variant="outlined" color="white" className="styleButtonHover hover:opacity-100">Title</Button>
                            <Button variant="outlined" color="white" className="styleButtonHover hover:opacity-100">Poplarity</Button>
                            <Button variant="outlined" color="white" className="styleButtonHover hover:opacity-100">Date</Button>
                            <Button variant="outlined" color="white" className="styleButtonHover hover:opacity-100">Ratin</Button>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="styleHeaderWhite">SORT ORDER</p>
                        <div className="flex gap-11">
                            <Button variant="outlined" color="white" className="styleButtonHover hover:opacity-100">Descidngin</Button>
                            <Button variant="outlined" color="white" className="styleButtonHover hover:opacity-100">Ascending</Button>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default Home;

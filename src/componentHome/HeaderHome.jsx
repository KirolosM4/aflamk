import React from "react";
import { Button } from "@material-tailwind/react";

const HeaderHome = () => {
    return(
        <>
            <p className="text-center text-4xl font-bold text-[#0DCAF0] py-5">Home</p>
            <div className="flex justify-around flex-wrap gap-4">
                <div>
                    <p className="text-center py-2 text-2xl font-bold text-white md:text-3xl">SORT BY</p>
                    <div className="flex gap-4">
                        <Button className="py-3 px-4 hover:bg-white hover:text-black" variant="outlined" color="white">Title</Button>
                        <Button className="py-3 px-4 hover:bg-white hover:text-black" variant="outlined" color="white">Poplarity</Button>
                        <Button className="py-3 px-4 hover:bg-white hover:text-black" variant="outlined" color="white">Date</Button>
                        <Button className="py-3 px-4 hover:bg-white hover:text-black" variant="outlined" color="white">Ratin</Button>
                    </div>
                </div>
                <div>
                    <p className="text-center py-2 text-2xl font-bold text-white md:text-3xl">SORT ORDER</p>
                    <div className="flex gap-4">
                        <Button className="py-3 px-4 hover:bg-white hover:text-black"  variant="outlined" color="white">Descingin</Button>
                        <Button className="py-3 px-4 hover:bg-white hover:text-black"  variant="outlined" color="white">Ascending</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderHome;
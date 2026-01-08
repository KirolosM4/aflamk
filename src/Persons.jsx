import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import InfoPerson from "./componentPerson/infoPerson";
import SecondInfoPerson from "./componentPerson/SecondInfoPerson";
const Persons = () => {
    const {personId} = useParams();
    return(
        <div className="flex flex-col bg-black lg:flex-row">
            <InfoPerson/>
            <SecondInfoPerson/>
        </div>
    )
}

export default Persons;
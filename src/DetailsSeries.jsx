import React from "react";
import SeriesDetails from "./componentDetailsSeries/seriesDetails";
import BilledCastSeries from "./componentDetailsSeries/BilledCastSeries";
import RecommendationSeries from "./componentDetailsSeries/RecommendationSeries";
const DetailsSeries = () => {
    return(
        <div className="bg-black">
            <SeriesDetails/>
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-[75%]">
                    <BilledCastSeries/>
                    {/* <Social/>
                    <Media/> */}
                    <RecommendationSeries/>
                </div>
                {/* <KeyWords/> */}
            </div>
        </div>
    )
}

export default DetailsSeries;
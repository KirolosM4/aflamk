import React, { useState } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon} from "@heroicons/react/24/outline";

const Pagination = ({setNumberPagination,numberPagination}) => {
    const next = () => {
        if (numberPagination === 500) return;
        setNumberPagination(numberPagination + 1);
    };
    const lastPage = () => {
        if (numberPagination === 500) return;
        setNumberPagination(500);
    };
    
    const prev = () => {
        if (numberPagination === 1) return;
        setNumberPagination(numberPagination - 1);
    };
    const firstPage = () => {
        if (numberPagination === 1) return;
        setNumberPagination(1);
    };
    return (
        <div className="flex justify-center items-center gap-3 py-3">
            <IconButton
                size="sm"
                variant="outlined"
                color="cyan"
                onClick={firstPage}
                disabled={numberPagination === 1}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                </svg>
            </IconButton>
            <IconButton
                size="sm"
                variant="outlined"
                color="cyan"
                onClick={prev}
                disabled={numberPagination === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
            <Typography color="white" className="font-normal">
                <p className="flex gap-3">{numberPagination} <span className="text-[#0DCAF0]">Page of</span> 500</p>
            </Typography>
            <IconButton
                size="sm"
                variant="outlined"
                color="cyan"
                onClick={next}
                disabled={numberPagination === 500}
            >
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
            <IconButton
                size="sm"
                variant="outlined"
                color="cyan"
                onClick={lastPage}
                disabled={numberPagination === 500}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>
            </IconButton>

        </div>
    );
}

export default Pagination;
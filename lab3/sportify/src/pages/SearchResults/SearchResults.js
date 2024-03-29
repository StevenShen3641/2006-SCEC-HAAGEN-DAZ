import React, { useState, useEffect } from "react";
import SearchEntry from "./SearchEntry";
import useCSVData from "../../data/csvData.js";

const SearchResults = ()=>{
    const csvData = useCSVData();
    return(
        <>
        {
            csvData.map((location)=>{ return <SearchEntry imageLink={location.Images} 
                                                          nameOfLocation={location.Name} 
                                                          address={`${location.X}, ${location.Y}`} 
                                                          sports={location.Sports}></SearchEntry>})
        }
        </>
    );
}

export default SearchResults;
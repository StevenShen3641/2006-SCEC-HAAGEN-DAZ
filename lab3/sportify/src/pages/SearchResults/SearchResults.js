import React, { useState, useEffect } from "react";
import SearchEntry from "./SearchEntry";
import useCSVData from "../../data/csvData.js";
import addressGetter from "../../helper/addressGetter.js";
import TopNavBar from "../../components/TopNavBar/TopNavbar";

const SearchResults = ({buttonPopup, setButtonPopup})=>{
    const csvData = useCSVData();
    return(
        <>
        <header>
        <TopNavBar buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />
      </header>
        {
            csvData.map((location)=>{ return <SearchEntry imageLink={location.Images} 
                                                          nameOfLocation={location.Name} 
                                                          addressGetter={()=> addressGetter(location.Y,location.X)} 
                                                          sports={location.Sports}
                                                          ></SearchEntry>})
        }
        </>
    );
}

export default SearchResults;
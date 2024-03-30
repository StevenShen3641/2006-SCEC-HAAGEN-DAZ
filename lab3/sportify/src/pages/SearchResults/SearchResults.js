import React, { useState, useEffect } from "react";
import { Link, createMemoryRouter, useLocation } from "react-router-dom";
import SearchEntry from "./SearchEntry";
import useCSVData from "../../data/csvData.js";
import addressGetter from "../../helper/addressGetter.js";
import TopNavBar from "../../components/TopNavBar/TopNavbar";

const SearchResults = ({buttonPopup, setButtonPopup})=>{
    const displayData = useLocation().state.displayData;
    return(
        <>
        <header>
        <TopNavBar buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />
      </header>
        {
            displayData.map((location)=>{ return (<SearchEntry imageLink={location.Images} 
                                                          nameOfLocation={location.Name} 
                                                          addressGetter={()=> addressGetter(location.Y,location.X)} 
                                                          sports={location.Sports}
                                                          distanceFromCenter={location.distanceFromCenter}
                                                          ></SearchEntry>)})
        }
        </>
    );
}

export default SearchResults;
import React, { useState, useEffect } from "react";
import { Link, createMemoryRouter, useLocation } from "react-router-dom";
import SearchEntry from "./SearchEntry";
import useCSVData from "../../data/csvData.js";
import addressGetter from "../../helper/addressGetter.js";
import TopNavBar from "../../components/TopNavBar/TopNavbar";
import APICaller from "../Home/APICaller.js";

const SearchResults = ({ buttonPopup, setButtonPopup }) => {
    const displayData = useLocation().state.displayData;

    // please ignore, testing
    // const apiCaller = new APICaller();
    // const read = apiCaller.fetchPSIReadings();
    // console.log(read);

    return (
        <>

            <header>
                <TopNavBar buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />
            </header>
            {
                displayData.map((location) => {
                    return (<SearchEntry imageLink={location.Images}
                        nameOfLocation={location.Name}
                        addressGetter={() => addressGetter(location.Y, location.X)}
                        sports={location.Sports}
                        distanceFromCenter={location.distanceFromCenter}
                    //   score = {scoreCalculator()}
                    ></SearchEntry>)
                })
            }
        </>

    );
}

export default SearchResults;
import React, { useState, useEffect } from "react";
import { Link, createMemoryRouter, useLocation } from "react-router-dom";
import SearchEntry from "./SearchEntry";
import useCSVData from "../../contextProviders/CSVDataContext.js";
import addressGetter from "../../helperFunctions/addressGetter.js";
import TopNavBar from "../../components/TopNavBar/TopNavbar";
import CalculateScores from "../../helperFunctions/Calculators/CalculateScores.js";
import CalculateDistance from "../../helperFunctions/Calculators/CalculateDistance";

const SearchResults = ({ buttonPopup, setButtonPopup }) => {
  const displayData = useLocation().state.displayData;
  const ori = useLocation().state.ori;
  const modes = useLocation().state.travelModes;
  const [isLoaded, setIsLoaded] = useState(false);
  const [overallScores, setOverallScores] = useState();

  // for Google Maps
  useEffect(() => {
    if (window.google) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  });


  const fetch = async (displayData, ori, modes) =>{
    return CalculateDistance(displayData, ori, modes)
  }

  const res = fetch(displayData, ori, modes)
  console.log(res)

  // useEffect(()=>{
  //   setOverallScores(CalculateScores(displayData,ori,modes))
  // },[])
  

  

  return (
    <>
      <header>
        <TopNavBar buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />
      </header>
      <body>
        {/* {distance != null && Object.keys(distances).length == displayData.length && */}
        {
          displayData.map((location) => {
            return (
              <SearchEntry
                locationKey={location.index}
                imageLink={location.Images}
                nameOfLocation={location.Name}
                addressGetter={() => addressGetter(location.Y, location.X)}
                sports={location.Sports}
                distanceFromCenter={location.distanceFromCenter}
                score = {overallScores}
              ></SearchEntry>
            );
          })}
      </body>
    </>
  );
};

export default SearchResults;

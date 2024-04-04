import React, { useState, useEffect } from "react";
import { Link, createMemoryRouter, useLocation } from "react-router-dom";
import SearchEntry from "./SearchEntry";
import useCSVData from "../../data/csvData.js";
import addressGetter from "../../helper/addressGetter.js";
import TopNavBar from "../../components/TopNavBar/TopNavbar";
import APICaller from "../Home/APICaller.js";
import { useLoadScript, LoadScript } from "@react-google-maps/api";

const SearchResults = ({ buttonPopup, setButtonPopup }) => {
  const displayData = useLocation().state.displayData;
  const [isLoaded, setIsLoaded] = useState(false);

  // for Google Maps
  useEffect(() => {
    if (window.google) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  });
  const google = window.google;
  const { PTvalue, Walkvalue, Carvalue, MBvalue } =
    useLocation().state.travelModes;

  const modes = (() => {
    const transportModes = [];
    if (isLoaded) {
      if (PTvalue) {
        transportModes.push(google.maps.TravelMode.TRANSIT);
      }
      if (Walkvalue) {
        transportModes.push(google.maps.TravelMode.WALKING);
      }
      if (Carvalue) {
        transportModes.push(google.maps.TravelMode.DRIVING);
      }
      if (MBvalue) {
        transportModes.push(google.maps.TravelMode.BICYCLING);
      }
      return transportModes;
    }
  })();
  console.log(modes);
  // please ignore, testing
  // const apiCaller = new APICaller();
  // const read = apiCaller.fetchPSIReadings();
  // console.log(read);

  return (
    <>
      <header>
        <TopNavBar buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />
      </header>
      <body>
        {displayData.map((location) => {
          return (
            <SearchEntry
              imageLink={location.Images}
              nameOfLocation={location.Name}
              addressGetter={() => addressGetter(location.Y, location.X)}
              sports={location.Sports}
              distanceFromCenter={location.distanceFromCenter}
              //   score = {scoreCalculator()}
            ></SearchEntry>
          );
        })}
      </body>
    </>
  );
};

export default SearchResults;

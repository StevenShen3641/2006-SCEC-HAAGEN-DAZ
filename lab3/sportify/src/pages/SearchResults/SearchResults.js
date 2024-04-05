import React, { useState, useEffect } from "react";
import { Link, createMemoryRouter, useLocation } from "react-router-dom";
import SearchEntry from "./SearchEntry";
import useCSVData from "../../data/csvData.js";
import addressGetter from "../../helper/addressGetter.js";
import TopNavBar from "../../components/TopNavBar/TopNavbar";
import APICaller from "../Home/APICaller.js";

const SearchResults = ({ buttonPopup, setButtonPopup }) => {
  const displayData = useLocation().state.displayData;
  const ori = useLocation().state.ori;
  const modes = useLocation().state.travelModes;
  const [isLoaded, setIsLoaded] = useState(false);

  // for Google Maps
  useEffect(() => {
    if (window.google) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  });

  const apiCaller = new APICaller();
  const [distance, setDistance] = useState({});
  useEffect(() => {
    let d = null;
    displayData.forEach((value) => {
      apiCaller
        .fetchDistance(
          ori,
          {
            lat: parseFloat(value.Y),
            lng: parseFloat(value.X),
          },
          modes
        )
        .then((result) => {
          console.log(result);
          d = result;
          setDistance((prevDistance) => ({...prevDistance, [value.index]: d}));
        });
    });
  }, []);
  console.log(distance);

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
        {distance != null &&
          displayData.map((location) => {
            return (
              <SearchEntry
                key={location.index}
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

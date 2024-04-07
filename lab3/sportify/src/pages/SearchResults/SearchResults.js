import React, { useState, useEffect } from "react";
import { Link, createMemoryRouter, useLocation } from "react-router-dom";
import SearchEntry from "./SearchEntry";
import useCSVData from "../../contextProviders/CSVDataContext.js";
import addressGetter from "../../helperFunctions/addressGetter.js";
import TopNavBar from "../../components/TopNavBar/TopNavbar";
import APICaller from "../../helperFunctions/APICaller.js";

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
  const [distances, setDistances] = useState({});
  // const distances;
  useEffect(() => {
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

          setDistances((prevDistance) => ({ ...prevDistance, [value.index]: result }));
        });
    });
  }, []);
  console.log(distances);

  // please ignore, testing
  // const apiCaller = new APICaller();
  // const read = apiCaller.fetchUVIReadings();
  // console.log(read);

  return (
    <>
      <header>
        <TopNavBar buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />
      </header>
      <body>
        {/* {distance != null && Object.keys(distances).length == displayData.length && */}
        {distances != null &&
          displayData.map((location) => {
            return (
              <SearchEntry
                locationKey={location.index}
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

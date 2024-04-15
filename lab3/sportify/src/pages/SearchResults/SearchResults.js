import React, { useState, useEffect } from "react";
import {
  Link,
  createMemoryRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SearchEntry from "./SearchEntry";
import addressGetter from "../../helperFunctions/addressGetter.js";
import TopNavBar from "../../components/TopNavBar/TopNavbar";
import CalculateScores from "../../helperFunctions/Calculators/CalculateScores.js";

const SearchResults = ({ buttonPopup, setButtonPopup }) => {
  const navigate = useNavigate();
  const displayData = useLocation().state.displayData;
  const ori = useLocation().state.ori;
  const modes = useLocation().state.travelModes;
  const [isLoaded, setIsLoaded] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [overallScores, setOverallScores] = useState({});

  // for Google Maps
  useEffect(() => {
    if (window.google) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  });

  useEffect(() => {
    CalculateScores(displayData, ori).then((result) => {
      setOverallScores(result);
    });
  }, []);

  return (
    <>
      <header>
        <TopNavBar buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />
      </header>
      <body>
        <>
          {displayData
            .filter((location) =>
              Object.keys(overallScores).includes(location.index)
            )
            .sort(
              (a, b) =>
                parseInt(overallScores[b.index]) -
                parseInt(overallScores[a.index])
            )
            .map((location) => {
              return (
                Object.keys(overallScores).length !== 0 && (
                  <SearchEntry
                    locationKey={location.index}
                    imageLink={location.Images}
                    nameOfLocation={location.Name}
                    addressGetter={() => addressGetter(location.Y, location.X)}
                    sports={location.Sports}
                    distanceFromCenter={location.distanceFromCenter}
                    overallScores={parseInt(overallScores[location.index])}
                    findOutMore={(id) => {
                      navigate(`/SportsLocation/${id}`, {
                        state: {
                          travelModes: modes,
                          ori: ori,
                          displayData: displayData,
                        },
                      });
                    }}
                  ></SearchEntry>
                )
              );
            })}
        </>
      </body>
    </>
  );
};

export default SearchResults;

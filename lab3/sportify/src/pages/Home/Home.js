import "../../assets/App.css";
import Data from "../../data/data2.csv";
import React, { useState, useEffect, useContext } from "react";
import { Link, createMemoryRouter, useNavigate } from "react-router-dom";
import SearchFilter from "./SearchFilter";
import Map from "../../components/Map/Map";
import SearchBar from "../../components/SearchBar/SearchBar";
import TopNavBar from "../../components/TopNavBar/TopNavbar";
import {CSVDataContext} from "../../context/CSVDataContext.js";
import calculateDistance from "./distanceCalculator.js";
import { useLoadScript } from "@react-google-maps/api";
import APICaller from "./APICaller.js";
import calculatePSIScore from "../../components/Calculators/CalculatePSI.js";
const libraries = ["places"];

function Home({ buttonPopup, setButtonPopup }) {
  // initial value
  console.log('hi');
  const csvData = useContext(CSVDataContext);
  console.log(csvData)
  const navigate = useNavigate();
  const apiCaller = new APICaller();
  const [infoWindow, setInfoWindow] = useState(true);
  const [address, setAddress] = useState("");
  const [zoom, setZoom] = useState(11);
  const [center, setCenter] = useState({
    // set map center
    lat: 1.36,
    lng: 103.8,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const google = window.google
  useEffect(() => {
    if (window.google) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  });

  const [showFilter, setShowFilter] = useState(false);
  const [sliderValue, setSliderValue] = useState(2);
  const [circleRadius, setCircleRadius] = useState(0);
  const [PTvalue, setPTvalue] = useState(true);
  const [Walkvalue, setWalkvalue] = useState(true);
  const [Carvalue, setCarvalue] = useState(true);
  const [MBvalue, setMBvalue] = useState(true);

  const filterToggle = () => {
    if (address === "Your Location1") {
      setAddress("Your Location");
    }
    if (address) {
      setSliderValue(sliderValue);
      setShowFilter(!showFilter);
      setInfoWindow(false);
    }
  };
  useEffect(() => {
    if (!address) {
      setInfoWindow(true);
      setShowFilter(false);
    }
    return;
  }, [address]);

  //Filter locations in radius
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    if (csvData && csvData.length > 0 && center && center.lat && center.lng) {
      setFilteredData([]);
      const filtered = csvData.filter(
        (item) => {
          const distanceFromCenter = calculateDistance(center.lat, center.lng, item.Y, item.X);
          item['distanceFromCenter'] = distanceFromCenter;
          return distanceFromCenter <= sliderValue;
        }

      );
      // console.log(filtered);
      setFilteredData(filtered);
    }
  }, [sliderValue, center, csvData]);
  
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
  {
    /* Use to check if filtering locations is working
    useEffect(() => {
      if (csvData && csvData.length > 0 && center && center.lat && center.lng) {
        console.log(filteredData);
      }
    }, [filteredData, center, csvData]);
  }*/
  }
  return (
    <div className="App">
      <header>
        <TopNavBar buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />
        {/* lazy initialization */}
        {isLoaded ? (
          <SearchBar
            address={address}
            setAddress={setAddress}
            setCenter={setCenter}
            setShowFilter={setShowFilter}
            filterToggle={filterToggle}
            searchAction={() => {
              //call score calculator
              if (filteredData.length !== 0)
                navigate("/SearchResults", {
                  state: {
                    displayData: filteredData,
                    travelModes: modes,
                    ori: center
                  },
                });
            }}
          />
        ) : null}
        <SearchFilter
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          PTvalue={PTvalue}
          setPTvalue={setPTvalue}
          Walkvalue={Walkvalue}
          setWalkvalue={setWalkvalue}
          Carvalue={Carvalue}
          setCarvalue={setCarvalue}
          MBvalue={MBvalue}
          setMBvalue={setMBvalue}
        />
      </header>
      <body>
        {isLoaded ? (
          <Map
            filteredData={filteredData}
            address={address}
            center={center}
            infoWindow={infoWindow}
            isLoaded={isLoaded}
            setInfoWindow={setInfoWindow}
            sliderValue={sliderValue}
            showFilter={showFilter}
            zoom={zoom}
            circleRadius={circleRadius}
            setZoom={setZoom}
            setCenter={setCenter}
            setCircleRadius={setCircleRadius}
            setSliderValue={setSliderValue}
          />
        ) : null}
      </body>
    </div>
  );
}

export default Home;

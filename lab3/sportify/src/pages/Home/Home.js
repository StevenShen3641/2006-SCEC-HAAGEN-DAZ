import "../../assets/App.css";
import Data from "../../data/data2.csv";
import SearchIcon from "../../assets/search.svg";
import FilterIcon from "../../assets/filter-.svg";
import React, { useState, useEffect } from "react";
import { Link, createMemoryRouter, useNavigate } from "react-router-dom";
import SearchFilter from "./SearchFilter";
import Map from "../../components/Map/Map";
import SearchBar from "../../components/SearchBar/SearchBar";
import TopNavBar from "../../components/TopNavBar/TopNavbar";
import useCSVData from "../../data/csvData.js";
import calculateDistance from "./distanceCalculator.js";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoBox,
  CircleF,
} from "@react-google-maps/api";

function Home() {
  const csvData = useCSVData();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // set the visibility to true after a delay to trigger the transition
    const timeout = setTimeout(() => {
      setIsVisible(true);
    });

    return () => clearTimeout(timeout);
  }, []);
  // set map values
  const [infoBox, setInfoBox] = useState(true);
  const [address, setAddress] = useState("");
  const [center, setCenter] = useState({
    // set map center
    lat: 1.348610224209925,
    lng: 103.68319907301334,
  });
  const [zoom, setZoom] = useState(15);
  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyARlWZy2P7eQPaegBck6jLcxTMHDr-VuAg",
    libraries: ["places"],
  });

  let mapMessage;

  if (loadError) {
    mapMessage = (
      <div style={{ fontSize: "20px", textAlign: "center" }}>
        Error loading maps
      </div>
    );
  } else if (!isLoaded) {
    mapMessage = (
      <div style={{ fontSize: "20px", textAlign: "center" }}>Loading maps</div>
    );
  }

  // initial value
  const [showFilter, setShowFilter] = useState(false);
  const [sliderValue, setSliderValue] = useState(2);
  const [circleRadius, setCircleRadius] = useState(0);
  const [PTvalue, setPTvalue] = useState(true);
  const [Walkvalue, setWalkvalue] = useState(true);
  const [Carvalue, setCarvalue] = useState(true);
  const [MBvalue, setMBvalue] = useState(true);

  //for popup
  const [buttonPopup, setButtonPopup] = useState(false);

  const filterToggle = () => {
    if (address) {
      setSliderValue(sliderValue);
      setShowFilter(!showFilter);
      setInfoBox(false);
    }
  };
  useEffect(() => {
    if (!address) {
      setInfoBox(true);
      setShowFilter(false);
    }
    return;
  }, [address]);

  useEffect(() => {
    let startRadius = circleRadius;
    let endRadius = sliderValue * 1000;
    let step = (endRadius - startRadius) / 120; // Adjust 20 to control the speed
    let currentRadius = startRadius;

    const interval = setInterval(() => {
      currentRadius += step;
      if (Math.abs(currentRadius - endRadius) <= Math.abs(step)) {
        // If close enough to the end radius, set it exactly and clear the interval
        setCircleRadius(endRadius);
        clearInterval(interval);
      } else {
        // Otherwise, continue updating the radius
        setCircleRadius(currentRadius);
      }
    }, 2);
    return () => clearInterval(interval);
  }, [sliderValue]);
  //Filter locations in radius
  const [filteredData, setFilteredData] = useState([]);
  {
    /*
  useEffect(() => {
    if (center && center.lat && center.lng) {
      const filtered = csvData.filter(
        (item) => calculateDistance(center, item) <= sliderValue
      );
      setFilteredData(filtered);
    }
  }, [sliderValue, center]);
  useEffect(() => {
    console.log(filteredData[0]);
  }, [filteredData]);
*/
  }
  // console.log(csvData[0]);
  return (
    <div className="App">
      <header>
        <TopNavBar buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />
        <div className={`search gradual ${isVisible ? "visible" : ""} warning`}>
          <div style={{ width: "100%" }}>
            {/* lazy initialization */}
            {isLoaded ? (
              <SearchBar
                address={address}
                setAddress={setAddress}
                setCenter={setCenter}
              />
            ) : null}
          </div>
          <div className="search-button" onClick={filterToggle}>
            <img src={FilterIcon} alt="filter"></img>
          </div>
          <div
            className="search-button"
            onClick={() => {
              navigate("/SearchResults");
            }}
          >
            <img src={SearchIcon} alt="search"></img>
          </div>
        </div>
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
            address={address}
            center={center}
            infoBox={infoBox}
            setInfoBox={setInfoBox}
            sliderValue={sliderValue}
            showFilter={showFilter}
            mapMessage={mapMessage}
            zoom={zoom}
            circleRadius={circleRadius}
            setZoom={setZoom}
            setCenter={setCenter}
          />
        ) : null}
      </body>
    </div>
  );
}

export default Home;

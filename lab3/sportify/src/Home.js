import logo from "./images/logo.png";
import "./App.css";
import Data from './data1.csv';
import SearchIcon from "./search.svg";
import FilterIcon from "./filter-.svg";
import React, { useState, useEffect } from "react";
import { Link, createMemoryRouter } from "react-router-dom";
import SearchFilter from "./SearchFilter";
import SearchBar from "./SearchBar";
import PopupComponent from './PopupComponent';
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoBox,
  CircleF,
} from "@react-google-maps/api";
import Papa from 'papaparse';
// set map style
const mapContainerStyle = {
  width: "50vw",
  height: "500px",
};
function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Data);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value);
      const parsedData = Papa.parse(csvData,{
        header: true,
        skipEmptyLines:true
      }).data;
      setData(parsedData);
    };
    fetchData();
  }, []);
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
  const [buttonPopup, setButtonPopup] = useState(false);

  const filterToggle = () => {
    if (address) {
      setSliderValue(2);
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

  // auto zoom
  useEffect(() => {
    let newCenter = { lat: center.lat, lng: center.lng };
    setCenter(newCenter);
    if (showFilter) {
      if (sliderValue < 1) {
        setZoom(16);
        // } else if (sliderValue < 2) {
        //   setZoom(15);
      } else if (sliderValue < 3) {
        setZoom(14);
        // } else if (sliderValue < 5) {
        //   setZoom(13);
      } else if (sliderValue < 8) {
        setZoom(12);
      } else if (sliderValue < 18) {
        setZoom(11);
      } else {
        setZoom(10);
      }
    } else {
      setZoom(15);
    }
    return;
  }, [showFilter, sliderValue]);

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
  return (
    <div className="App">
      <header>
        <div className="logo-container">
          <img align="left" className="logo" src={logo} alt="logo" />
        </div>
        <div className="menu-container">
          {/* Home will lead us to homepage */}
          <Link to="/" className="menu">
            {" "}
            Home{" "}
          </Link>
          <button className="contact-us" onClick={() => setButtonPopup(true)}>
            Contact Us
          </button>
          <PopupComponent
            buttonPopup={buttonPopup}
            setButtonPopup={setButtonPopup}
          />
        </div>
        <div className={`search gradual ${isVisible ? "visible" : ""}`}>
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
          <div className="search-button">
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
        <div className={`map gradual ${isVisible ? "visible" : ""}`}>
          {mapMessage || (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={zoom}
              center={center}
              clickableIcons={false}
              options={{
                disableDefaultUI: true,
                scrollwheel: true,
              }}
            >
              {address && (
                <MarkerF
                  position={center}
                  onClick={() => {
                    setInfoBox(true);
                  }}
                />
              )}
              {address && showFilter && (
                <CircleF
                  center={center}
                  radius={circleRadius}
                  options={{
                    strokeOpacity: 0.5,
                    strokeWeight: 2,
                    clickable: false,
                    draggable: false,
                    editable: false,
                    visible: true,
                    fillOpacity: 0.1,
                    strokeColor: "red",
                    fillColor: "red",
                  }}
                />
              )}
              {address && infoBox && (
                <InfoBox
                  position={center}
                  options={{
                    boxStyle: {
                      width: "40%",
                      borderRadius: "6px",
                      fontSize: "15px",
                      backgroundColor: "#fffffa",
                    },
                    closeBoxURL: "",
                  }}
                >
                  <div>
                    <p
                      style={{
                        padding: "7px",
                      }}
                    >
                      {address}
                    </p>
                    <div
                      style={{
                        padding: "7px",
                      }}
                    >
                      <button
                        className="close-button"
                        onClick={() => {
                          setInfoBox(false);
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </InfoBox>
              )}
            </GoogleMap>
          )}
          <div className="slider"> </div>
        </div>
      </body>
    </div>
  );
}

export default Home;

import logo from "./images/logo.png";
import "./App.css";
import SearchIcon from "./search.svg";
import FilterIcon from "./filter-.svg";
import React, { useState, useEffect } from "react";
import { Link, createMemoryRouter } from "react-router-dom";
import Popup from "./Popup";
import SearchFilter from "./SearchFilter";
import SearchBar from "./SearchBar";
import PopupComponent from './PopupComponent';
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoBox,
  CircleF,
  Circle,
} from "@react-google-maps/api";

// set map style
const mapContainerStyle = {
  width: "50vw",
  height: "500px",
};

function Home() {
  // set init effect
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // set the visibility to true after a delay to trigger the transition
    const timeout = setTimeout(() => {
      setIsVisible(true);
    });

    return () => clearTimeout(timeout);
  }, []);

  // set map values
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("Nanyang Technological University");
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
  const [PTvalue, setPTvalue] = useState(true);
  const [Walkvalue, setWalkvalue] = useState(true);
  const [Carvalue, setCarvalue] = useState(true);
  const [MBvalue, setMBvalue] = useState(true);
  const [buttonPopup, setButtonPopup] = useState(false);
  const filterToggle = () => {
    setShowFilter(!showFilter);
  };

  // auto zoom
  useEffect(() => {
    if (showFilter) {
      if (sliderValue < 2) {
        setZoom(15) 
      } else if (sliderValue < 5) {
        setZoom(13) 
      } else if (sliderValue < 8) {
        setZoom(12)
      } else if (sliderValue < 18) {
        setZoom(11)
      } else {
        setZoom(10)
      }
    } else {
      setZoom(15);
    }
    return;
  }, [showFilter, sliderValue]);

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
          <PopupComponent buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />
        </div>
        <div className={`search gradual ${isVisible ? "visible" : ""}`}>
          <div style={{ width: "100%" }}>
            {/* lazy initialization */}
            {isLoaded ? (
              <SearchBar setAddress={setAddress} setCenter={setCenter} />
            ) : null}
          </div>

          <img onClick={filterToggle} src={FilterIcon} alt="filter"></img>
          <img src={SearchIcon} alt="search"></img>
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
            >
              <MarkerF
                position={center}
                onClick={() => {
                  setOpen(true);
                }}
              />
              {showFilter && (
                <CircleF
                  center={center}
                  radius={sliderValue * 1000}
                  options={{
                    strokeOpacity: 0.5,

                    strokeWeight: 1,
                    clickable: false,
                    draggable: false,
                    editable: false,
                    visible: true,
                    fillOpacity: 0.05,
                    strokeColor: "red",
                    fillColor: "red",
                  }}
                />
              )}
              {open && (
                <InfoBox
                  position={center}
                  options={{
                    boxStyle: {
                      width: "30%",
                      borderRadius: "6px",
                      fontSize: "15px",
                      backgroundColor: "white",
                    },
                    closeBoxURL: "",
                  }}
                >
                  <div>
                    <p>{address}</p>
                    <button
                      className="close-button"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      Close
                    </button>
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

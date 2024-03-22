import logo from "./images/logo.png";
import "./App.css";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import SearchIcon from "./search.svg";
import FilterIcon from "./filter-.svg";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "./Popup";
((g) => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
  d[l]
    ? console.warn(p + " only loads once. Ignoring:", g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({
  key: "AIzaSyARlWZy2P7eQPaegBck6jLcxTMHDr-VuAg",
  v: "weekly",
  // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
  // Add other bootstrap parameters as needed, using camel case.
});

const google = window.google;

// set map style
const mapContainerStyle = {
  width: "50vw",
  height: "500px",
};

// set map center
const center = {
  lat: 1.348610224209925,
  lng: 103.68319907301334,
};

// let map;

// async function initMap() {
//   const position = { lat: -25.344, lng: 131.031 };
//   const { Map } = await google.maps.importLibrary("maps");
//   const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

//   // The map, centered at Uluru
//   map = new Map(document.getElementById("map"), {
//     zoom: 4,
//     center: position,
//     mapId: "DEMO_MAP_ID",
//   });

//   // marker, positioned at Uluru
//   const marker = new AdvancedMarkerElement({
//     map: map,
//     position: position,
//     title: "Uluru",
//   });
// }

// initMap();

function Home() {
  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyARlWZy2P7eQPaegBck6jLcxTMHDr-VuAg",
  });

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
  let address;
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
          {/* contact us will lead us to contact page*/}
          {/*<Link to="/Contact" className="menu">
            {" "}
            Contact Us{" "}
  </Link>*/}
          <button className="contact-us" onClick={() => setButtonPopup(true)}>
            Contact Us
          </button>
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h1>Having Trouble?</h1>
            <h2>Contact us through GitHub:</h2>
            <h3>@randallctc</h3>
          </Popup>
        </div>
        <div className="search">
          <input value={address} placeholder="Search for address"></input>
          <img onClick={filterToggle} src={FilterIcon} alt="filter"></img>
          <img src={SearchIcon} alt="search"></img>
        </div>
        {showFilter && ( //if showFilter == true, show filter options
          <div className="filter-popup">
            <p align="left">Radius: {sliderValue}Km</p>
            <div className="slidecontainer">
              <input
                type="range"
                min="1"
                max="50"
                value={sliderValue}
                className="slider"
                onChange={(e) => setSliderValue(e.target.value)}
              />
              <p align="left">Mode Of Transport:</p>
              <div className="buttonContainer">
                <input
                  className="filterbutton"
                  type="checkbox"
                  checked={Walkvalue}
                  onChange={(e) => setWalkvalue(e.target.checked)}
                />
                <label>Walk</label>

                <input
                  className="filterbutton"
                  type="checkbox"
                  checked={Carvalue}
                  onChange={(e) => setCarvalue(e.target.checked)}
                />
                <label>Car</label>

                <input
                  className="filterbutton"
                  type="checkbox"
                  checked={MBvalue}
                  onChange={(e) => setMBvalue(e.target.checked)}
                />
                <label>Motorbike</label>

                <input
                  className="filterbutton"
                  type="checkbox"
                  checked={PTvalue}
                  onChange={(e) => setPTvalue(e.target.checked)}
                />
                <label>Public Transport</label>
              </div>
            </div>
          </div>
        )}
      </header>
      <body>
        {/* map */}
        {!isLoaded ? (
          <div>Loading maps</div>
        ) : loadError ? (
          <div>Error loading maps</div>
        ) : (
          <div className="map">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={13}
              center={center}
            >
              <MarkerF
                position={center}
                label={"Nanyang Technological University"}
              />
            </GoogleMap>
          </div>
        )}
      </body>
    </div>
  );
}

export default Home;

import logo from "./images/logo.png";
import "./App.css";
import SearchIcon from "./search.svg";
import FilterIcon from "./filter-.svg";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "./Popup";
import Searchfilter from "./Searchfilter";
import {
  
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

// set map center
const position = { lat: 1.3493824645163768, lng: 103.68300588667157 };

function Home() {

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
        <Searchfilter
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
        <div className="map">
          <APIProvider apiKey={"AIzaSyARlWZy2P7eQPaegBck6jLcxTMHDr-VuAg"}>
            <Map
              style={{ width: "100%", height: "500px" }}
              defaultCenter={{
                lat: 1.3493824645163768,
                lng: 103.68300588667157,
              }}
              defaultZoom={13}
              gestureHandling={"auto"}
              disableDefaultUI={true}
              mapId={"e6103122d831e416"}
            >
              <AdvancedMarker
                position={{ lat: 1.3493824645163768, lng: 103.68300588667157 }}
              />
            </Map>
          </APIProvider>
        </div>
      </body>
    </div>
  );
}

export default Home;

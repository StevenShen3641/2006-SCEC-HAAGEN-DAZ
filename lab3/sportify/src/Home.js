import logo from "./images/logo.png";
import "./App.css";
import SearchIcon from "./search.svg";
import FilterIcon from "./filter-.svg";
import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Popup from "./Popup";
import Searchfilter from "./Searchfilter";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoBox,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
// set map style
const mapContainerStyle = {
  width: "50vw",
  height: "500px",
};

// set map center
const PlacesAutocomplete = ({ setAddress, setCenter }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const [comboboxList, setComboboxList] = useState(true);

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setAddress(address);
    setCenter({ lat: lat, lng: lng });
    setComboboxList(false);
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        placeholder={"Search for address"}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setComboboxList(true);
        }}
        disabled={!ready}
      />
      {comboboxList && (
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      )}
    </Combobox>
  );
};

function Home() {
  // set init effect
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // set the visibility to true after a delay to trigger the transition
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 80);

    return () => clearTimeout(timeout);
  }, []);

  // set map values
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [address, setAddress] = useState('Nanyang Technological University')
  const [center, setCenter] = useState({
    lat: 1.348610224209925,
    lng: 103.68319907301334,
  });

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
        <div className={`search gradual ${isVisible ? "visible" : ""}`}>
          <div style={{ width: "100%" }}>
            {/* lazy initialization */}
            {isLoaded ? <PlacesAutocomplete setAddress={setAddress} setCenter={setCenter} /> : null}
          </div>

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
        <div className={`map gradual ${isVisible ? "visible" : ""}`}>
          {mapMessage || (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={13}
              center={center}
              clickableIcons={false}
            >
              <MarkerF
                position={center}
                onClick={() => {
                  setOpen(true);
                }}
              />
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
        </div>
      </body>
    </div>
  );
}

export default Home;

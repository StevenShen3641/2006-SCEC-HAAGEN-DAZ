import "../../assets/App.css";
import Data from "../../data/data2.csv";
import React, { useState, useEffect } from "react";
import { Link, createMemoryRouter, useNavigate } from "react-router-dom";
import SearchFilter from "./SearchFilter";
import Map from "../../components/Map/Map";
import SearchBar from "../../components/SearchBar/SearchBar";
import TopNavBar from "../../components/TopNavBar/TopNavbar";
import useCSVData from "../../data/csvData.js";
import calculateDistance from "./distanceCalculator.js";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

function Home({buttonPopup, setButtonPopup}) {
  // initial value
  const csvData = useCSVData();
  const navigate = useNavigate();
  
  const [infoWindow, setInfoWindow] = useState(true);
  const [address, setAddress] = useState("");
  const [zoom, setZoom] = useState(11);
  const [center, setCenter] = useState({
    // set map center
    lat: 1.36,
    lng: 103.8,
  });
  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyARlWZy2P7eQPaegBck6jLcxTMHDr-VuAg",
    libraries: libraries,
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
      setAddress("Your Location")
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
        (item) =>{
          const distanceFromCenter = calculateDistance(center.lat, center.lng, item.Y, item.X);
          item['distanceFromCenter'] = distanceFromCenter;
           return distanceFromCenter <=sliderValue;
        }
          
      );
      // console.log(filtered);
      setFilteredData(filtered);
    }
  }, [sliderValue, center, csvData]);
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
                filterToggle={filterToggle}
                searchAction={() => {
                  if(filteredData.length !== 0) navigate("/SearchResults",{state:{displayData: filteredData}});
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
            loadError={loadError}
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

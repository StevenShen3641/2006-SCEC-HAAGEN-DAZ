
import React from 'react';
import detailStyles from '../../assets/Details.module.css';
import styles from '../../assets/SearchEntry.module.css';
import TopNavBar from "../../components/TopNavBar/TopNavbar";
import { useState, useEffect } from "react";
import useCSVData from "../../data/csvData.js";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useLocation } from 'react-router-dom';

const libraries = ["places"];

const Details = function ({buttonPopup, setButtonPopup }) {
    console.log('Details component rendered');
    const csvData = useCSVData();

    
    const [infoWindow, setInfoWindow] = useState(true);
    //const [address, setAddress] = useState("");
    const [zoom, setZoom] = useState(11);
    const [location, setCenter] = useState({
      // set map center
      lat: 1.36,
      lng: 103.8,
    });
    const { isLoaded, loadError } = useLoadScript({
      id: "google-map-script",
      googleMapsApiKey: "AIzaSyARlWZy2P7eQPaegBck6jLcxTMHDr-VuAg",
      libraries: libraries,
    });

    const {state} = useLocation();

    const {imageLink, nameOfLocation, address, sports, distanceFromCenter} = state;

    if (loadError) {
        return <div>Error loading Google Maps API</div>;
      }
    
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <header>
        <TopNavBar buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />
        </header>
        <div className={detailStyles.Details}>
        <div className={detailStyles.sideLeft} style={{backgroundImage: `url(${imageLink})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
        <div className={detailStyles.sideRight}>
            <div className={detailStyles.infoBox}>
            <p><span>Location: {nameOfLocation}</span></p>
                <p><span>Activities: {sports}</span></p>
                <p><span>Rain: </span></p>
                <p><span>Weather: </span></p>
                <p><span>Pre-Check-In: 10</span></p>
                <p><span>Check-In: 12</span></p>
                <button>Pre-Check-In</button>
            </div>
        </div>
    </div > 
        <div style = {{marginTop : "10px"} }></div>
        <GoogleMap
        mapContainerStyle={{
            height : "500px"
        }}
        center = {location}
        zoom = {15}
        >   
        </GoogleMap>
    </>
    );
}

export default Details;

import React, { useState, useEffect, useContext } from "react";
import { useParams} from "react-router-dom";
import {CSVDataContext} from "../../contextProviders/CSVDataContext.js";
import styles from '../../assets/SportsLocation.module.css';
import TopNavBar from "../../components/TopNavBar/TopNavbar";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import APICaller from "../../helperFunctions/APICaller.js";
import Map from "../../components/Map/Map.js";
import cross from "../../assets/images/cross.png";
import check from "../../assets/images/check.png";

const libraries = ["places"];

const SportsLocation = ({ buttonPopup, setButtonPopup })=>{

    const {id} = useParams();
    const {csvData, setCsvData} = useContext(CSVDataContext);
    
    const [locationData,setLocationData] = useState();
    useEffect(()=>{
        if(csvData){
            setLocationData(csvData.find((item)=>{return item.index === id}));
        }

    },[csvData])
    
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


    if (loadError) {
        return <div>Error loading Google Maps API</div>;
      }
    
    if (!isLoaded) {
        return <div>Loading...</div>;
    }


    return(
        <>
        <header>
        <TopNavBar buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />
        </header>
        <div className={styles.Details}>
        <div className={styles.sideLeft} style={{backgroundImage: `url(${locationData.Images})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
        <div className={styles.sideRight}>
            <div className={styles.infoBox}>
            <p><span>Location: {locationData.Name}</span></p>
                <p><span>Activities: {locationData.Sports}</span></p>
                <div>
                <p><span>Rain: </span></p>{1 ? 
                <img className={styles.icon} src={check} /> : 
                <img className={styles.icon} src={cross} />}
                </div>
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
    )
}

export default SportsLocation;
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
import calculateRainfallAmount from "../../helperFunctions/Calculators/CalculateRainfall.js";
import calculateAirTemp from "../../helperFunctions/Calculators/CalculateAirTemp.js";
import calculateUVI from "../../helperFunctions/Calculators/CalculateUV.js";
import calculatePSI from "../../helperFunctions/Calculators/CalculatePSI.js";

import {ActivityRings} from "@jonasdoesthings/react-activity-rings";

const libraries = ["places"];

const SportsLocation = ({ buttonPopup, setButtonPopup })=>{

    const {id} = useParams();
    const {csvData, setCsvData} = useContext(CSVDataContext);
    
    //Load the locationData 
    const [locationData,setLocationData] = useState();
    useEffect(()=>{
        if(csvData){
            setLocationData(csvData.find((item)=>{return item.index === id}));
        }
    },[csvData])

    //If the locationData has been loaded, use it to get the locationData's Name
    // const[locationName,setLocationName] = useState();
    // useEffect(() => {
    //     if (locationData) {
    //         // Check if locationData is defined before accessing its properties
    //         if (locationData.Name) setLocationName(locationData.Name);
    //     }
    // }, [locationData]);


    const apiCaller = new APICaller();
    const read = apiCaller.fetchWeatherReadings();
    console.log(read);
     
    const [infoWindow, setInfoWindow] = useState(true);
    //const [address, setAddress] = useState("");
    const [zoom, setZoom] = useState(11);
    // const [location, setCenter] = useState({
    //     // set map center
    //     lat: locationlat,
    //     lng: locationlng,
    //   });
    const { isLoaded, loadError } = useLoadScript({
      id: "google-map-script",
      googleMapsApiKey: "AIzaSyARlWZy2P7eQPaegBck6jLcxTMHDr-VuAg",
      libraries: libraries,
    });


//Extracting the result from the calculators
    const [rainFallState, setRainFallState] = useState();
    const [airTemp, setAirTemp] = useState();
    const[PSIValue, setPSIValue] = useState();
    const[UVIvalue, setUVIValue] = useState();


    useEffect(() => {if(locationData){
        calculateRainfallAmount(locationData)
            .then(result => {
                setRainFallState(result);
            })
            .catch(error => {
                console.error("Error fetching rainfall amount:", error);
                setRainFallState();
            });
        
        calculateAirTemp(locationData)
            .then(result => {
                setAirTemp(result);
            })
            .catch(error => {
                console.error("Error fetching Air Temperature:", error);
                setAirTemp();
            });

        calculatePSI(locationData)
            .then(result => {
                setPSIValue(result);
            })
            .catch(error => {
                console.error("Error fetching PSI Temperature:", error);
                setPSIValue();
            });

        calculateUVI(locationData)
            .then(result => {
                setUVIValue(result);
            })
            .catch(error => {
                console.error("Error fetching PSI Temperature:", error);
                setUVIValue();
            });
        
        
    }
}, [locationData]);


    //Debug to see if the values are extracted from the promise 
    console.log(locationData);
    console.log("Rain: ",rainFallState)
    console.log("AirTemp: ", airTemp);
    console.log("PSI: ", PSIValue);
    console.log("UVI: ", UVIvalue);


    //Maximum value is determined using the values used in CalculateScore
    const airTempRatio = airTemp/33;
    const PSIRatio = PSIValue/200;
    const UVIRatio = UVIvalue/11;

    const ratioVerifier = (element)=>{
        //Ensure ratio is not over 1
        if (element > 1){
            return 1;
        }

        if (element < 0){
            return -element;
        }

        return element;
    }

    console.log("AirTemp ratio: ", airTempRatio);
    console.log("PSI ratio: ", PSIRatio);
    console.log("UVI ratio: ", UVIRatio);

    


    if (loadError) {
        return <div>Error loading Google Maps API</div>;
      }
    
    if (!isLoaded) {
        return <div>Loading...</div>;
    }


    return(locationData?
        (<>
        <header>
        <TopNavBar buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />
        </header>
        <body>
        <div className={styles.Details}>
        <div className={styles.sideLeft} style={{backgroundImage: `url(${locationData.Images})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
        <div className={styles.sideRight}>
            <div className={styles.infoBox}>
            <p><span>Location: {locationData.Name}</span></p>
                <p><span>Activities: {locationData.Sports}</span></p>
                <div>
                <p><span>Rain: </span></p>{(rainFallState) ? 
                <img className={styles.check} src={check} /> : 
                <img className={styles.cross} src={cross} />}
                </div>
                <p><span>Weather: </span></p>
                <p><span>Pre-Check-In: 10</span></p>
                <p><span>Check-In: 12</span></p>
                <button className={styles.PreCheckIn}>Pre-Check-In</button>
                <div style={{ marginRight : '-600px', marginTop: '-300px'}}>
                <ActivityRings rings={[
                    {filledPercentage: ratioVerifier(airTempRatio), color: '#7492b9',},
                    {filledPercentage: ratioVerifier(PSIRatio), color: '#4d6b53',},
                    {filledPercentage: ratioVerifier(UVIRatio), color: '#dc3b00',},
                    ]}
                    options={{
                        // animationDurationMillis: 1500,
                        containerHeight: '50vh',
                      }}

                />
                </div>
            </div>
        </div>
    </div > 
        <div style = {{marginTop : "10px"} }></div>
        <GoogleMap
        mapContainerStyle={{
            height : "500px"
        }}
        center = {{
            lat: parseFloat(locationData.Y),
            lng: parseFloat(locationData.X),
        }}
        zoom = {15}
        >   
        </GoogleMap>
        </body>

      </>):(
        <>
        <header><TopNavBar buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} /></header>
        <body>
            <h3>loading...</h3>
        </body>
        
        </>
      )
    )
}

export default SportsLocation;
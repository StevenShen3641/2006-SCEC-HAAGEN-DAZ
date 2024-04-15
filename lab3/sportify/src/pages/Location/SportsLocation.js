import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { CSVDataContext } from "../../contextProviders/CSVDataContext.js";
import styles from "../../assets/SportsLocation.module.css";
import TopNavBar from "../../components/TopNavBar/TopNavbar";
import APICaller from "../../helperFunctions/APICaller.js";
import MapResultPage from "./MapResultPage.js";

import cross from "../../assets/images/cross.png";
import check from "../../assets/images/check.png";

//Import images for the weather
import clear from "../../assets/images/weather/clear.png";
import partlyCloudy from "../../assets/images/weather/partlyCloudy.png";
import lightShower from "../../assets/images/weather/lightShower.png";
import thunderyShower from "../../assets/images/weather/thunderyShower.png";
import Cloudy from "../../assets/images/weather/cloudy.png";
import heavyThunderyShower from "../../assets/images/weather/heavyThunderyShower.png";

import calculateRainfallAmount from "../../helperFunctions/Calculators/CalculateRainfall.js";
import calculateAirTemp from "../../helperFunctions/Calculators/CalculateAirTemp.js";
import calculateUVI from "../../helperFunctions/Calculators/CalculateUV.js";
import calculatePSI from "../../helperFunctions/Calculators/CalculatePSI.js";
import getWeatherReading from "../../helperFunctions/Calculators/GetWeatherReading.js";
import Timer from "../../components/Timer.js";

import { ActivityRings } from "@jonasdoesthings/react-activity-rings";

const SportsLocation = ({ buttonPopup, setButtonPopup }) => {
  const displayData = useLocation().state.displayData;
  const ori = useLocation().state.ori;
  const modes = useLocation().state.travelModes;

  const { id } = useParams();
  const context = useContext(CSVDataContext);
  const csvData = context.data;
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState();

  const [airData, setAirData] = useState();
  const [psiData, setpsiData] = useState();
  const [rainfallData, setRainfallData] = useState();
  const [UVIData, setUVIData] = useState(-1);
  const [weatherData, setWeatherData] = useState();

  const statusObject = JSON.parse(localStorage.getItem("status"));

  useEffect(() => {
    if (csvData) {
      setLocationData(csvData[id]);
    }
    if (locationData && statusObject) {
      console.log(locationData)
      const preCheckInFlag =
        statusObject[locationData["index"]]["preCheckInFlag"];
      const checkInFlag = statusObject[locationData["index"]]["checkInFlag"];
      const playingFlag = statusObject[locationData["index"]]["playingFlag"];
      // console.log(statusObject[locationData["index"]]);
      if (preCheckInFlag) {
        console.log(preCheckInFlag);
        setStatus(userState.PRECHECKIN);
        setInButtonText("Check-In");
        setOutButtonText("Pre-Check-Out");
      } else if (checkInFlag) {
        setStatus(userState.CHECKIN);
        setInButtonText("Playing");
        setOutButtonText("Check-Out");
      } else if (playingFlag) {
        setStatus(userState.PLAYING);
        setInButtonText(null);
        setOutButtonText("Check-Out");
      }
    }
  }, [csvData, statusObject, locationData]);

  // useState(() => {
  //   console.log(locationData);
  //   if (locationData && statusObject) {
  //   }
  // }, [locationData]);

  // load all data from api
  const apiCaller = new APICaller();
  useEffect(() => {
    apiCaller.fetchAirReadings().then((result) => {
      setAirData(result);
    });
    apiCaller.fetchPSIReadings().then((result) => {
      setpsiData(result);
    });
    apiCaller.fetchRainfallReadings().then((result) => {
      setRainfallData(result);
    });
    apiCaller.fetchUVIReadings().then((result) => {
      setUVIData(result);
    });
    apiCaller.fetchWeatherReadings().then((result) => {
      setWeatherData(result);
    });
  }, []);

  const [airTemp, setAirTemp] = useState(null);
  const [PSIValue, setPSIValue] = useState(null);
  const [rainFallState, setRainfallState] = useState(null);
  const [UVIvalue, setUVIvalue] = useState(null);
  const [airTempRatio, setAirTempRatio] = useState(-1);
  const [PSIRatio, setPSIRatio] = useState(-1);
  const [UVIRatio, setUVIRatio] = useState(-1);
  const [weatherForecast, setWeatherForecast] = useState(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (locationData && airData && psiData && rainfallData && UVIData !== -1) {
      setAirTemp(calculateAirTemp(locationData, airData));
      setPSIValue(calculatePSI(locationData, psiData));
      setRainfallState(calculateRainfallAmount(locationData, rainfallData));
      setUVIvalue(calculateUVI(locationData, UVIData));
      setWeatherForecast(getWeatherReading(locationData, weatherData));

      setAirTempRatio((airTemp - 5) / 35);
      setPSIRatio(PSIValue / 200);
      setUVIRatio(UVIvalue / 11);

      // set the visibility to true after a delay to trigger the transition
      const timeout = setTimeout(() => {
        setIsVisible(true);
      });
      return () => clearTimeout(timeout);
    }
  });

  const ratioVerifier = (element) => {
    if (element > 1) {
      return 1;
    } else if (element < 0) {
      return -element;
    }
    return element;
  };

  // set status
  const userState = Object.freeze({
    PRECHECKIN: 1,
    CHECKIN: 2,
    PLAYING: 3,
    DEFAULT: 0,
  });
  const [status, setStatus] = useState(userState.DEFAULT);
  // set User State Buttons
  const [inButtonText, setInButtonText] = useState("Pre-Check-In");
  const [outButtonText, setOutButtonText] = useState(null);
  const timerRef = useRef(null);
  const [timerStarted, setTimerStarted] = useState(false);

  const handleInClick = () => {
    if (!timerStarted) {
      if (timerRef.current) {
        timerRef.current.startTimer();
        setTimerStarted(true);
      }
    }

    if (status === userState.DEFAULT) {
      setInButtonText("Check-In");
      setOutButtonText("Pre-Check-Out");
      setStatus(userState.PRECHECKIN);
      statusObject[locationData["index"]]["preCheckIn"] += 1;
      statusObject[locationData["index"]]["preCheckInFlag"] = true;
      localStorage.setItem("status", JSON.stringify(statusObject));
    } else if (status === userState.PRECHECKIN) {
      setInButtonText("Playing");
      setOutButtonText("Check-Out");
      setStatus(userState.CHECKIN);
      statusObject[locationData["index"]]["preCheckIn"] -= 1;
      statusObject[locationData["index"]]["checkIn"] += 1;
      statusObject[locationData["index"]]["preCheckInFlag"] = false;
      statusObject[locationData["index"]]["checkInFlag"] = true;
      localStorage.setItem("status", JSON.stringify(statusObject));
    } else if (status === userState.CHECKIN) {
      setInButtonText(null);
      setOutButtonText("Check-Out");
      setStatus(userState.PLAYING);
      statusObject[locationData["index"]]["checkIn"] -= 1;
      statusObject[locationData["index"]]["playing"] += 1;
      statusObject[locationData["index"]]["checkInFlag"] = false;
      statusObject[locationData["index"]]["playingFlag"] = true;

      localStorage.setItem("status", JSON.stringify(statusObject));
    } else if (status === userState.PLAYING) {
      //technically not needed since user cannot press in button while at playing state
    }
  };

  const handleReturn = () => {
    navigate("/SearchResults", {
      state: {
        displayData: displayData,
        travelModes: modes,
        ori: ori,
      },
    });
  };

  const handleOutClick = () => {
    if (status === userState.DEFAULT) {
      //technically not possible
    } else if (status === userState.PRECHECKIN) {
      setInButtonText("Pre-Check-In");
      setOutButtonText(null);
      setStatus(userState.DEFAULT);
      statusObject[locationData["index"]]["preCheckIn"] -= 1;
      statusObject[locationData["index"]]["preCheckInFlag"] = false;
      localStorage.setItem("status", JSON.stringify(statusObject));
    } else if (status === userState.CHECKIN) {
      setInButtonText("Pre-Check-In");
      setOutButtonText(null);
      setStatus(userState.DEFAULT);
      statusObject[locationData["index"]]["checkIn"] -= 1;
      statusObject[locationData["index"]]["checkInFlag"] = false;
      localStorage.setItem("status", JSON.stringify(statusObject));
    } else if (status === userState.PLAYING) {
      setInButtonText("Pre-Check-In");
      setOutButtonText(null);
      setStatus(userState.DEFAULT);
      statusObject[locationData["index"]]["playing"] -= 1;
      statusObject[locationData["index"]]["playingFlag"] = false;
      localStorage.setItem("status", JSON.stringify(statusObject));
    }
  };

  const handleTimerDone = (result) => {
    if (result === 0) {
      handleOutClick();
      setTimerStarted(false);
    }
  };

  const setWeatherImage = (weatherForecast) => {
    switch (weatherForecast) {
      case "Partly Cloudy (Day)":
        return partlyCloudy;
      case "Partly Cloudy (Night)":
        return partlyCloudy;
      case "Light Showers":
        return lightShower;
      case "Thundery Showers":
        return thunderyShower;
      case "Clear (Day)":
        return clear;
      case "Cloudy":
        return Cloudy;
      default:
        return Cloudy;
    }
  };

  return locationData &&
    statusObject &&
    airTempRatio !== -1 &&
    PSIRatio !== -1 &&
    UVIRatio !== -1 ? (
    <>
      <header>
        <TopNavBar buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />
      </header>
      <body>
        <div className={styles.returnRow}>
          <button
            className={styles.button}
            style={{ width: "100px" }}
            onClick={handleReturn}
          >
            Return
          </button>
        </div>
        <div
          className={`${styles.Details} gradual ${isVisible ? "visible" : ""}`}
        >
          <div
            className={styles.sideLeft}
            style={{
              backgroundImage: `url(${locationData.Images})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className={styles.sideRight}>
            <div className={styles.infoBox}>
              <p>
                <span className="bold">Location:&nbsp; </span>
                {locationData.Name}
              </p>
              <p>
                <span className="bold">Activities:&nbsp; </span>
                {locationData.Sports}
              </p>
              <div className={styles.content}>
                <div>
                  <div className={styles.info}>
                    <div className={styles.infoEntry}>
                      <p style={{ marginTop: "0px" }}>
                        <span className="bold">Rain:&nbsp;&nbsp;</span>
                        <span>
                          {rainFallState ? (
                            <img className={styles.icon} src={check} />
                          ) : (
                            <img className={styles.icon} src={cross} />
                          )}
                        </span>
                      </p>
                      <p style={{ marginTop: "0px" }}>
                        <span className="bold">Weather:&nbsp;&nbsp;</span>
                        {/* <span>{weatherForecast} &nbsp;&nbsp; */}
                        <img
                          className={styles.weather}
                          src={setWeatherImage(weatherForecast)}
                        />
                        {/* </span> */}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="bold">Pre-Check-In:&nbsp;&nbsp;</span>
                        {statusObject[locationData["index"]]["preCheckIn"]}
                      </p>
                      <p>
                        <span className="bold">Check-In:&nbsp;&nbsp;</span>
                        {statusObject[locationData["index"]]["checkIn"]}
                      </p>
                      <p>
                        <span className="bold">Playing:&nbsp;&nbsp;</span>
                        {statusObject[locationData["index"]]["playing"]}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.ring}>
                  <ActivityRings
                    rings={[
                      {
                        filledPercentage: ratioVerifier(UVIRatio),
                        color: "#5DC9D2",
                      },
                      {
                        filledPercentage: ratioVerifier(PSIRatio),
                        color: "#606C38",
                      },

                      {
                        filledPercentage: ratioVerifier(airTempRatio),
                        color: "#EB5E28",
                      },
                    ]}
                    options={{
                      containerWidth: "200px",
                      containerHeight: "200px",
                    }}
                  />
                  <div className={styles.ringBox}>
                    <p style={{ color: "#EB5E28" }}>
                      Air Temparature: {airTemp} &deg;C
                    </p>
                    <p style={{ color: "#606C38" }}>
                      Pollutant Standards Index: {PSIValue}
                    </p>
                    <p style={{ color: "#5DC9D2" }}>
                      Ultraviolet Index: {UVIvalue}
                    </p>
                  </div>
                  <div className={styles.ringBoxReplace}>
                    <p style={{ color: "#EB5E28" }}>Temp: {airTemp} &deg;C</p>
                    <p style={{ color: "#606C38" }}>PSI: {PSIValue}</p>
                    <p style={{ color: "#5DC9D2" }}>UVI: {UVIvalue}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.buttonStatus}>
              <div className={styles.buttonBox}>
                <Timer timerDone={handleTimerDone} ref={timerRef} />
                {inButtonText && (
                  <button
                    className={styles.button}
                    style={{ marginBottom: "15px" }}
                    onClick={handleInClick}
                  >
                    {inButtonText}
                  </button>
                )}
                {outButtonText && (
                  <button
                    className={styles.button}
                    style={{ marginBottom: "15px" }}
                    onClick={handleOutClick}
                  >
                    {outButtonText}
                  </button>
                )}
              </div>
              <div className={styles.status}>
                <u>Status:</u>&nbsp;&nbsp;{" "}
                {(() => {
                  switch (status) {
                    case userState.DEFAULT:
                      return "Not Pre-Checked In";
                    case userState.PRECHECKIN:
                      return "Pre-Checked In";
                    case userState.CHECKIN:
                      return "Checked In";
                    case userState.PLAYING:
                      return "Playing";
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
        <MapResultPage
          ori={ori}
          dest={{
            lat: parseFloat(locationData.Y),
            lng: parseFloat(locationData.X),
          }}
          modes={modes}
        />
      </body>
    </>
  ) : (
    <>
      <header>
        <TopNavBar buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />
      </header>
    </>
  );
};

export default SportsLocation;

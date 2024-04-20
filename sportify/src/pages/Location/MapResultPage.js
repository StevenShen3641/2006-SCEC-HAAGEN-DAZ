import styles from "../../assets/SportsLocation.module.css";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const MapResultPage = ({ ori, dest, modes }) => {
  const google = window.google;
  const directionsService = new google.maps.DirectionsService();
  // set map style object
  const mapContainerStyle = {
    width: "85vw",
    height: "500px",
  };

  const mapContainerStyleMobile = {
    width: "90vw",
    height: "500px",
  };
  const [containerStyle, setContainerStyle] = useState(
    window.innerWidth <= 1000 ? mapContainerStyleMobile : mapContainerStyle
  );
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setContainerStyle(mapContainerStyleMobile);
      } else {
        setContainerStyle(mapContainerStyle);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // set the visibility to true after a delay to trigger the transition
    const timeout = setTimeout(() => {
      setIsVisible(true);
    });
    return () => clearTimeout(timeout);
  }, []);

  // directions
  const [directionsWalk, setDirectionsWalk] = useState(null);
  const [directionsPT, setDirectionsPT] = useState(null);
  const [directionsCar, setDirectionsCar] = useState(null);
  const [directionsMB, setDirectionsMB] = useState(null);
  // work with buttons
  const [walkVisible, setWalkVisible] = useState(true);
  const [PTVisible, setPTVisible] = useState(true);
  const [carVisible, setCarVisible] = useState(true);
  const [MBVisible, setMBVisible] = useState(true);
  const [walk, setWalk] = useState(false);
  const [PT, setPT] = useState(false);
  const [car, setCar] = useState(false);
  const [MB, setMB] = useState(false);

  useEffect(() => {
    for (let transport of modes) {
      if (transport === google.maps.TravelMode.WALKING) {
        setWalk(true);
      } else if (transport === google.maps.TravelMode.TRANSIT) {
        setPT(true);
      } else if (transport === google.maps.TravelMode.DRIVING) {
        setCar(true);
      } else if (transport === google.maps.TravelMode.BICYCLING) {
        setMB(true);
      }
    }
  }, []);

  useEffect(() => {
    const _ = (async () => {
      for (let transport of modes) {
        if (transport === google.maps.TravelMode.WALKING) {
          const results = await directionsService.route({
            origin: ori,
            destination: dest,
            travelMode: google.maps.TravelMode.WALKING,
          });
          setDirectionsWalk(results);
        } else if (transport === google.maps.TravelMode.TRANSIT) {
          const results = await directionsService.route({
            origin: ori,
            destination: dest,
            travelMode: google.maps.TravelMode.TRANSIT,
          });
          setDirectionsPT(results);
        } else if (transport === google.maps.TravelMode.DRIVING) {
          const results = await directionsService.route({
            origin: ori,
            destination: dest,
            travelMode: google.maps.TravelMode.DRIVING,
          });
          setDirectionsCar(results);
        } else if (transport === google.maps.TravelMode.BICYCLING) {
          const results = await directionsService.route({
            origin: ori,
            destination: dest,
            travelMode: google.maps.TravelMode.BICYCLING,
          });
          setDirectionsMB(results);
        }
      }
    })();
  }, []);

  return (
    <>
      <div
        className={`${styles.checkbox} gradual ${isVisible ? "visible" : ""}`}
      >
        <div className={styles.checkboxTitle}>
          Route Display:&nbsp;&nbsp;&nbsp;
        </div>
        {walk && (
          <>
            <input
              className={styles.buttonWalk}
              type="checkbox"
              checked={walkVisible}
              onChange={(e) => setWalkVisible(e.target.checked)}
            />
            Walk&nbsp;&nbsp;<div className={styles.checkboxTitle}>&nbsp;</div>
          </>
        )}
        {car && (
          <>
            <input
              className={styles.buttonCar}
              type="checkbox"
              checked={carVisible}
              onChange={(e) => setCarVisible(e.target.checked)}
            />
            Car&nbsp;&nbsp;<div className={styles.checkboxTitle}>&nbsp;</div>
          </>
        )}
        {MB && (
          <>
            <input
              className={styles.buttonMB}
              type="checkbox"
              checked={MBVisible}
              onChange={(e) => setMBVisible(e.target.checked)}
            />
            Motorbike&nbsp;&nbsp;
            <div className={styles.checkboxTitle}>&nbsp;</div>
          </>
        )}
        {PT && (
          <>
            <input
              className={styles.buttonPT}
              type="checkbox"
              checked={PTVisible}
              onChange={(e) => setPTVisible(e.target.checked)}
            />
            Public Transport
          </>
        )}
      </div>
      <div className={`${styles.map} gradual ${isVisible ? "visible" : ""}`}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={14}
          // cen
          center={{
            lat: (ori.lat + dest.lat) / 2,
            lng: (ori.lng + dest.lng) / 2,
          }}
          clickableIcons={false}
          options={{
            disableDefaultUI: true,
            scrollwheel: true,
          }}
        >
          {walkVisible && directionsWalk && (
            <DirectionsRenderer
              directions={directionsWalk}
              options={{
                polylineOptions: {
                  strokeOpacity: 0.65,
                  strokeColor: "#ff1010",
                  strokeWeight: 5,
                },
              }}
            />
          )}
          {PTVisible && directionsPT && (
            <DirectionsRenderer
              directions={directionsPT}
              options={{
                polylineOptions: {
                  strokeOpacity: 0.65,
                  strokeColor: "#bf00bf",
                  strokeWeight: 5,
                },
              }}
            />
          )}
          {carVisible && directionsCar && (
            <DirectionsRenderer
              directions={directionsCar}
              options={{
                polylineOptions: {
                  strokeOpacity: 0.8,
                  strokeColor: "#005fff",
                  strokeWeight: 5,
                },
              }}
            />
          )}
          {MBVisible && directionsMB && (
            <DirectionsRenderer
              directions={directionsMB}
              options={{
                polylineOptions: {
                  strokeOpacity: 0.65,
                  strokeColor: "#ff5f00",
                  strokeWeight: 5,
                },
              }}
            />
          )}
        </GoogleMap>
      </div>
    </>
  );
};

export default MapResultPage;

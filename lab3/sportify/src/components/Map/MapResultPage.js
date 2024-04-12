// import "../../assets/App.css";
import styles from "../../assets/SportsLocation.module.css";
import { GoogleMap, DirectionsRenderer, infoWindowF } from "@react-google-maps/api";
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

  useEffect(() => {
    const _ = (async () => {
      for (let transport of modes) {
        if (transport === google.maps.TravelMode.WALKING) {
          const results = await directionsService.route({
            origin: ori,
            destination: dest,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.WALKING,
          });
          setDirectionsWalk(results);
        }
      }
    })();
  }, []);

  return (
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
        {directionsWalk && (
          <DirectionsRenderer
            directions={directionsWalk}
            // panel={<div>123</div>}
            options={{
              infoWindow: (<infoWindowF></infoWindowF>),
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapResultPage;

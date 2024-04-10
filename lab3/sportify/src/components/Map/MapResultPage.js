import "../../assets/App.css";
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  CircleF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

const MapResultPage = ({
}) => {
  // set map style object
  const mapContainerStyle = {
    width: "50vw",
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
  // set address

  useEffect(() => {
    // set the visibility to true after a delay to trigger the transition
    const timeout = setTimeout(() => {
      setIsVisible(true);
    });

    return () => clearTimeout(timeout);
  }, []);


  return (
    <div className={`map gradual ${isVisible ? "visible" : ""}`}>
      
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={14}
          // cen
          clickableIcons={false}
          options={{
            disableDefaultUI: true,
            scrollwheel: true,
          }}
        >
        </GoogleMap>
      
    </div>
  );
};

export default MapResultPage;

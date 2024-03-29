import "../../assets/App.css";
import {
  GoogleMap,
  MarkerF,
  InfoBox,
  CircleF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

// set map style object
const mapContainerStyle = {
  width: "50vw",
  height: "500px",
};

const Map = ({
  address,
  center,
  infoBox,
  isLoaded,
  loadError,
  setInfoBox,
  sliderValue,
  showFilter,
  zoom,
  circleRadius,
  setZoom,
  setCenter,
  setCircleRadius,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // set the visibility to true after a delay to trigger the transition
    const timeout = setTimeout(() => {
      setIsVisible(true);
    });

    return () => clearTimeout(timeout);
  }, []);

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

  // auto zoom
  useEffect(() => {
    let newCenter = { lat: center.lat, lng: center.lng };
    setCenter(newCenter);
    if (showFilter) {
      if (sliderValue < 1) {
        setZoom(16);
        // } else if (sliderValue < 2) {
        //   setZoom(15);
      } else if (sliderValue < 3) {
        setZoom(14);
        // } else if (sliderValue < 5) {
        //   setZoom(13);
      } else if (sliderValue < 9) {
        setZoom(12);
      } else if (sliderValue < 18) {
        setZoom(11);
      } else {
        setZoom(10);
      }
    } else {
      setZoom(15);
    }
    return;
  }, [showFilter, sliderValue]);

  // gradual circle change
  useEffect(() => {
    let startRadius = circleRadius;
    let endRadius = sliderValue * 1000;
    let step = (endRadius - startRadius) / 120; // Adjust 20 to control the speed
    let currentRadius = startRadius;

    const interval = setInterval(() => {
      currentRadius += step;
      if (Math.abs(currentRadius - endRadius) <= Math.abs(step)) {
        // If close enough to the end radius, set it exactly and clear the interval
        setCircleRadius(endRadius);
        clearInterval(interval);
      } else {
        // Otherwise, continue updating the radius
        setCircleRadius(currentRadius);
      }
    }, 2);
    return () => clearInterval(interval);
  }, [sliderValue]);
  return (
    <div className={`map gradual ${isVisible ? "visible" : ""}`}>
      {mapMessage || (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={zoom}
          center={center}
          clickableIcons={false}
          options={{
            disableDefaultUI: true,
            scrollwheel: true,
          }}
        >
          {address && (
            <MarkerF
              position={center}
              onClick={() => {
                setInfoBox(true);
              }}
            />
          )}
          {address && showFilter && (
            <CircleF
              center={center}
              radius={circleRadius}
              options={{
                strokeOpacity: 0.5,
                strokeWeight: 2,
                clickable: false,
                draggable: false,
                editable: false,
                visible: true,
                fillOpacity: 0.1,
                strokeColor: "red",
                fillColor: "red",
              }}
            />
          )}

          {address && infoBox && (
            <InfoBox
              position={center}
              options={{
                boxStyle: {
                  width: "40%",
                  borderRadius: "6px",
                  fontSize: "15px",
                  backgroundColor: "#fffffa",
                },
                closeBoxURL: "",
              }}
            >
              <div>
                <p
                  style={{
                    padding: "7px",
                  }}
                >
                  {address}
                </p>
                <div
                  style={{
                    padding: "7px",
                  }}
                >
                  <button
                    className="close-button"
                    onClick={() => {
                      setInfoBox(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </InfoBox>
          )}
        </GoogleMap>
      )}
      <div className="slider"> </div>
    </div>
  );
};

export default Map;

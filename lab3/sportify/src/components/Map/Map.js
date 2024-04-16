import calculateDistance from "../../helperFunctions/calculateMapDistance";
import "../../assets/App.css";
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  CircleF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import axios, * as others from "axios";

async function getAddressForCoords(lat, lng) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBksScsByRu_iyIx4pJ9Xf9et3FjB_wBBs`
    );

    const data = response.data;
    if (!data || data.status !== "OK") {
      return null;
    } else {
      const address = data.results[0]["formatted_address"];
      return address;
    }
  } catch (error) {
    console.error("Fail to fetch address for geocode:", error);
  }
}

const Map = ({
  filteredData,
  address,
  center,
  infoWindow,
  isLoaded,
  setInfoWindow,
  sliderValue,
  showFilter,
  zoom,
  circleRadius,
  setZoom,
  setCenter,
  setCircleRadius,
  setFilteredData,
  setSliderValue,
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

  const [activeMarker, setActiveMarker] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [indexAddress, setIndexAddress] = useState({});
  // set address
  useEffect(() => {
    for (const data of filteredData) {
      getAddressForCoords(data.Y, data.X).then((result) => {
        setIndexAddress((prevDistance) => ({
          ...prevDistance,
          [data.index]: result,
        }));
      });
    }
  }, [filteredData]);
  useEffect(() => {
    // set the visibility to true after a delay to trigger the transition
    const timeout = setTimeout(() => {
      setIsVisible(true);
    });

    return () => clearTimeout(timeout);
  }, []);

  let mapMessage;

  if (!isLoaded) {
    mapMessage = (
      <div style={{ fontSize: "20px", textAlign: "center" }}>Loading maps</div>
    );
  }
  useEffect(() => {
    setSliderValue(2);
  }, [showFilter]);

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
      } else if (sliderValue < 5) {
        setZoom(13);
      } else if (sliderValue < 9) {
        setZoom(12);
      } else if (sliderValue < 20) {
        setZoom(11);
      } else {
        setZoom(10);
      }
    } else if (address) {
      setZoom(15);
    }
    return;
  }, [address, showFilter, sliderValue]);

  // gradual circle change
  let currentRadius = circleRadius;
  useEffect(() => {
    let endRadius = sliderValue * 1000;
    let step = (endRadius - currentRadius) / 45; // Adjust 20 to control the speed
    currentRadius = circleRadius;

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
    }, 10);
    return () => clearInterval(interval);
  }, [sliderValue]);

  return (
    <div className={`map gradual ${isVisible ? "visible" : ""}`}>
      {mapMessage || (
        <GoogleMap
          mapContainerStyle={containerStyle}
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
                setInfoWindow(true);
              }}
              icon={{
                url: "https://img.icons8.com/fluency/48/000000/map-pin.png",
              }}
            />
          )}
          {address &&
            showFilter &&
            filteredData.length !== 0 &&
            filteredData.map(({ index, Name, X, Y }) => {
              if (
                calculateDistance(
                  parseFloat(Y),
                  parseFloat(X),
                  center.lat,
                  center.lng
                ) <
                circleRadius / 1000
              ) {
                return (
                  <MarkerF
                    key={index}
                    position={{
                      lat: parseFloat(Y),
                      lng: parseFloat(X),
                    }}
                    onClick={() =>
                      setActiveMarker({
                        index: index,
                        name: Name,
                        X: X,
                        Y: Y,
                      })
                    }
                  ></MarkerF>
                );
              }
            })}
          {activeMarker && showFilter && (
            <InfoWindowF
              position={{
                lat: parseFloat(activeMarker.Y),
                lng: parseFloat(activeMarker.X),
              }}
              onCloseClick={() => setActiveMarker(null)}
            >
              <>
                <div>{activeMarker.name}</div>
                <div>Address: {indexAddress[activeMarker.index]}</div>
              </>
            </InfoWindowF>
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

          {address && address !== "Your Location1" && infoWindow && (
            <InfoWindowF
              onCloseClick={() => {
                setInfoWindow(false);
              }}
              position={{ lat: center.lat, lng: center.lng }}
              options={{
                disableAutoPan: false,
              }}
            >
              <div>{address}</div>
            </InfoWindowF>
          )}
        </GoogleMap>
      )}
      <div className="slider"> </div>
    </div>
  );
};

export default Map;

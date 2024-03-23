import React, { useEffect, useState } from "react";
import "./Searchfilter.css";

function SearchFilter(props) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (!props.showFilter) {
      setIsVisible(false);
    }
  }, [props.showFilter]);
  useEffect(() => {
    // set the visibility to true after a delay to trigger the transition
    if (isVisible === false) {
        const timeout = setTimeout(() => {
        setIsVisible(true);
        }, 80);
        return () => clearTimeout(timeout);
    }
  }, [props.showFilter]);
  return props.showFilter ? (
    <div className={`filter-popup gradual ${isVisible ? "visible" : ""}`}>
      <p align="left">Radius: {props.sliderValue}Km</p>
      <div className="slidecontainer">
        <input
          type="range"
          min="1"
          max="50"
          value={props.sliderValue}
          className="slider"
          onChange={(e) => props.setSliderValue(e.target.value)}
        />
        <p align="left">Mode Of Transport:</p>
        <div className="buttonContainer">
          <input
            className="filterbutton"
            type="checkbox"
            checked={props.Walkvalue}
            onChange={(e) => props.setWalkvalue(e.target.checked)}
          />
          <label>Walk</label>

          <input
            className="filterbutton"
            type="checkbox"
            checked={props.Carvalue}
            onChange={(e) => props.setCarvalue(e.target.checked)}
          />
          <label className="Buttonlabel">Car</label>

          <input
            className="filterbutton"
            type="checkbox"
            checked={props.MBvalue}
            onChange={(e) => props.setMBvalue(e.target.checked)}
          />
          <label>Motorbike</label>

          <input
            className="filterbutton"
            type="checkbox"
            checked={props.PTvalue}
            onChange={(e) => props.setPTvalue(e.target.checked)}
          />
          <label>Public Transport</label>
        </div>
      </div>
    </div>
  ) : null;
}

export default SearchFilter;

import React, { useEffect, useState } from "react";
import styles from "./SearchFilter.module.css";

function SearchFilter(props) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (!props.showFilter) {
      setIsVisible(false);
    }
  }, [props.showFilter]);
  useEffect(() => {
    // set the visibility to true after a delay to trigger the transition
    if (isVisible === false && props.showFilter === true) {
        const timeout = setTimeout(() => {
        setIsVisible(true);
        }, );
        return () => clearTimeout(timeout);
    }
  }, [props.showFilter]);
  return props.showFilter ? (
    <div className={`${styles.filterPopup} ${styles.gradual} ${isVisible ? styles.visible : ""}`}>
      <p align="left">Radius: {props.sliderValue}Km</p>
      <div className={styles.slideContainer}>
        <input
          type="range"
          min="1"
          max="50"
          value={props.sliderValue}
          className={styles.slider}
          onChange={(e) => props.setSliderValue(e.target.value)}
        />
        <p align="left">Mode Of Transport:</p>
        <div className={styles.buttonContainer}>
          <input
            className={styles.filterButton}
            type="checkbox"
            checked={props.Walkvalue}
            onChange={(e) => props.setWalkvalue(e.target.checked)}
          />
          <label>Walk</label>

          <input
            className={styles.filterButton}
            type="checkbox"
            checked={props.Carvalue}
            onChange={(e) => props.setCarvalue(e.target.checked)}
          />
          <label className={styles.Buttonlabel}>Car</label>

          <input
            className={styles.filterButton}
            type="checkbox"
            checked={props.MBvalue}
            onChange={(e) => props.setMBvalue(e.target.checked)}
          />
          <label>Motorbike</label>

          <input
            className={styles.filterButton}
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

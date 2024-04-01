import React, { useEffect, useState } from "react";
import styles from "../../assets/SearchFilter.module.css";

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
      });
      return () => clearTimeout(timeout);
    }
  }, [props.showFilter]);
  return props.showFilter ? (
    <div
      className={`${styles.filterPopup} ${styles.gradual} ${
        isVisible ? styles.visible : ""
      }`}
    >
      <div className={styles.slideContainer}>
        <p align="left">Radius: {props.sliderValue}Km</p>
        <input
          type="range"
          min="0"
          max="50"
          step={1}
          value={props.sliderValue === 0.5 ? 0 : props.sliderValue}
          className={styles.slider}
          onChange={(e) => {
            if (e.target.value < 1) {
              props.setSliderValue(0.5);
            } else {
              props.setSliderValue(e.target.value);
            }
          }}
        />
        <p align="left">Mode Of Transport:</p>
        <div className={styles.buttonContainer}>
          <div>
            <input
              className={styles.filterButton}
              type="checkbox"
              checked={props.Walkvalue}
              onChange={(e) => props.setWalkvalue(e.target.checked)}
            />
          </div>
          <label>Walk</label>

          <div>
            <input
              className={styles.filterButton}
              type="checkbox"
              checked={props.Carvalue}
              onChange={(e) => props.setCarvalue(e.target.checked)}
            />
          </div>
          <label className={styles.Buttonlabel}>Car</label>

          <div>
            <input
              className={styles.filterButton}
              type="checkbox"
              checked={props.MBvalue}
              onChange={(e) => props.setMBvalue(e.target.checked)}
            />
          </div>
          <label>Motorbike</label>
          {!(window.innerWidth <= 768) && (
            <div>
              <input
                className={styles.filterButton}
                type="checkbox"
                checked={props.PTvalue}
                onChange={(e) => props.setPTvalue(e.target.checked)}
              />
            </div>
          )}
          {!(window.innerWidth <= 768) && <label>Public Transport</label>}
        </div>
        <div className={styles.buttonContainer}>
          {window.innerWidth <= 768 && (
            <div>
              <input
                className={styles.filterButton}
                type="checkbox"
                checked={props.PTvalue}
                onChange={(e) => props.setPTvalue(e.target.checked)}
              />
            </div>
          )}
          {window.innerWidth <= 768 && <label>Public Transport</label>}
        </div>
      </div>
    </div>
  ) : null;
}

export default SearchFilter;

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
              value="walk"
              type="radio"
              name="transport"
              defaultChecked
              onChange={(e) => props.setMode(e.target.value)}
            />
          </div>
          <label>Walk</label>

          <div>
            <input
              className={styles.filterButton}
              value="car"
              type="radio"
              name="transport"
              onChange={(e) => props.setMode(e.target.value)}
            />
          </div>
          <label className={styles.Buttonlabel}>Car</label>

          <div>
            <input
              id=""
              className={styles.filterButton}
              value="motor"
              type="radio"
              name="transport"
              onChange={(e) => props.setMode(e.target.value)}
            />
          </div>
          <label>Motorbike</label>
          {!(window.innerWidth <= 768) && (
            <div>
              <input
                className={styles.filterButton}
                value="public"
                type="radio"
                name="transport"
                onChange={(e) => props.setMode(e.target.value)}
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
                value="public"
                type="radio"
                name="transport"
                onChange={(e) => props.setMode(e.target.value)}
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

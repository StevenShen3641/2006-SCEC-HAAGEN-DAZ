import styles from '../../assets/SearchEntry.module.css';
import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
  } from "react-router-dom";

const SearchEntry = function ({ locationKey, imageLink, nameOfLocation, addressGetter, sports, distanceFromCenter}) {
    // add gradual effect
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        // set the visibility to true after a delay to trigger the transition
        const timeout = setTimeout(() => {
          setIsVisible(true);
        });
        return () => clearTimeout(timeout);
      }, []);
    const [address, setAddress] = useState("");
    useEffect(()=>{
        (async function(){
            setAddress(await addressGetter());
        })()
    },[])
    return (
        <div className={`${styles.SearchEntry} gradual ${isVisible ? "visible" : ""}`}>
            <div className={styles.sideLeft} style={{backgroundImage: `url(${imageLink})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
            <div className={styles.sideRight}>
                <div className={styles.infoBox}>
                    <p><span>Location: {nameOfLocation}</span></p>
                    <p><span>Address: {address}</span></p>
                    <p><span>Activities: {sports}</span></p>
                    <p><span>Distance: {distanceFromCenter.toPrecision(4)}km from you</span></p>
                    <p><span>Type: Free</span></p>
                </div>
                <div className={styles.scorebox}>
                    <span>
                        <Link className={styles.button} to={`/SportsLocation/${locationKey}`}>Find out more</Link>
                        <h3>Score: 90/100</h3>
                    </span>
                </div>
            </div>
        </div >

    )
}

export default SearchEntry;
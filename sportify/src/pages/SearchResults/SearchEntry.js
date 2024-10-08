import styles from '../../assets/SearchEntry.module.css';
import React, { useState, useEffect } from "react";

const SearchEntry = function ({ locationKey, imageLink, nameOfLocation, addressGetter, sports, distanceFromCenter,overallScores, findOutMore}) {
    
    
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
    },[]);

    return (
        <div className={`${styles.SearchEntry} gradual ${isVisible ? "visible" : ""}`}>
            <div className={styles.sideLeft} style={{backgroundImage: `url(${imageLink})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
            <div className={styles.sideRight}>
                <div className={styles.infoBox}>
                    <p><span><span className="bold">Location:&nbsp;&nbsp;</span>{nameOfLocation}</span></p>
                    <p><span><span className="bold">Address:&nbsp;&nbsp;</span>{address}</span></p>
                    <p><span><span className="bold">Activities:&nbsp;&nbsp;</span>{sports}</span></p>
                    <p><span><span className="bold">Distance:&nbsp;&nbsp;</span>{distanceFromCenter.toPrecision(4)}km from you</span></p>
                    <p></p>
                </div>
                <div className={styles.scorebox}>
                    <span>
                        <button className={styles.button} onClick={() => findOutMore(locationKey)}>Find out more</button>
                        <h3 style={{fontWeight: 700}}>Score:{overallScores}</h3>
                    </span>
                </div>
            </div>
        </div >

    )
}

export default SearchEntry;
import styles from '../../assets/SearchEntry.module.css';
import React, { useState, useEffect } from "react";

const SearchEntry = function ({ imageLink, nameOfLocation, addressGetter, sports, distanceFromCenter }) {
    const [address, setAddress] = useState("");
    useEffect(()=>{
        (async function(){
            setAddress(await addressGetter());
        })()
    },[])

    return (
        <div className={styles.SearchEntry}>
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
                        <a className={styles.button} href='#'>Find out more</a>
                        <h3>Score: 90/100</h3>
                    </span>
                </div>
            </div>
        </div >

    )
}

export default SearchEntry;
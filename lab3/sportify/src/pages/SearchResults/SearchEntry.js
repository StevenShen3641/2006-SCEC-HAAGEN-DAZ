import styles from '../../assets/SearchEntry.module.css';
import React, { useState, useEffect } from "react";

const SearchEntry = function ({ imageLink, nameOfLocation, address, sports }) {

    return (
        <div className={styles.SearchEntry}>
            <div className={styles.side}><img src={imageLink} alt='picture of location'></img></div>
            <div className={styles.side}>
                <div className={styles.infoBox}>
                    <p><span>Location: {nameOfLocation}</span></p>
                    <p><span>Address: {address}</span></p>
                    <p><span>Activity: {sports}</span></p>
                    <p><span>Distance: 1.4km from you</span></p>
                    <p><span>Type: Free</span></p>
                </div>
                <div className={styles.scorebox}>
                    <span>
                        <a href='#'>Find out more</a>
                        <h3>Score: 90/100</h3>
                    </span>
                </div>
            </div>
        </div >

    )
}

export default SearchEntry;
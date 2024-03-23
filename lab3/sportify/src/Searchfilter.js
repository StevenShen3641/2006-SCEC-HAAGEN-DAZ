import React from "react";
import "./Searchfilter.css";

function SearchFilter(props) {
    return props.showFilter ? (

        <div className="filter-popup">
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

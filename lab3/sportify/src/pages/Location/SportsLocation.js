import React, { useState, useEffect, useContext } from "react";
import { useParams} from "react-router-dom";
import {CSVDataContext} from "../../context/CSVDataContext.js";
import TopNavBar from "../../components/TopNavBar/TopNavbar";

const SportsLocation = ({ buttonPopup, setButtonPopup })=>{

    const {id} = useParams();
    const {csvData, setCsvData} = useContext(CSVDataContext);
    
    const [locationData,setLocationData] = useState();
    useEffect(()=>{
        if(csvData){
            setLocationData(csvData.find((item)=>{return item.index === id}));
        }

    },[csvData])
    
    
    
    return(
        <>
        <header>
        <TopNavBar buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />
        </header>
        <body>{(locationData)?locationData.X:"hi"}</body>
      </>
    )
}

export default SportsLocation;
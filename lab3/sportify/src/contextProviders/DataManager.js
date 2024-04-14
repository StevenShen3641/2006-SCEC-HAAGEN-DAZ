import { CSVDataContext } from "./CSVDataContext.js";
import React, { useState, useEffect, useContext, useRef } from "react";

function useIncrementField(locationID,field){
    const { csvData, setCsvData } = useContext(CSVDataContext);
        csvData[locationID].field++;
        console.log(csvData)
        setCsvData(csvData);
        return;
    
    
}

function useDecrementField(locationID,field){
    const { csvData, setCsvData } = useContext(CSVDataContext);
    csvData[locationID].field--;
    setCsvData(csvData);
    return;
    
}
export {useIncrementField,useDecrementField};
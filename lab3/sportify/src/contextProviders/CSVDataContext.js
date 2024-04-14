import { useState, useEffect, createContext } from "react";
import Papa from "papaparse";
import Data from "../data/data2.csv";

export const CSVDataContext = createContext();

function CSVDataContextProvider({ children }) {
  const [csvData, setCsvData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Data);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvText = decoder.decode(result.value);
      const parsedData = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
      }).data;
      for (let data of parsedData) {
        data["Sports"] = data["Sports"]
          .toLowerCase()
          .replace(/\(o\)/g, "(outdoor)")
          .replace(/\(i\)/g, "(indoor)").replace("soccer", "football");
        data["PreCheckIn"] = randomIntFromInterval(0,15);
        data["CheckIn"] = randomIntFromInterval(0,15);
        data["Playing"] = randomIntFromInterval(0,15);
        
      }

      setCsvData(parsedData);
    };
    fetchData();
  }, []);


const randomIntFromInterval= (min, max)=>{ // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


const incrementField = (locationID,field)=>{
  const location = csvData[locationID];
  location[field]++;
  csvData[locationID] = location;
  //csvData[locationID][field]++;     this also works!!
  setCsvData(csvData);
}

const decrementField = (locationID,field)=>{
  const location = csvData[locationID];
  location[field]--;
  csvData[locationID] = location;
  //csvData[locationID][field]--;     this also works!!
  setCsvData(csvData);
}


  return (
    <CSVDataContext.Provider value={{ 
      data: csvData,
      incrementField: incrementField,
      decrementField: decrementField}}>
      {children}
    </CSVDataContext.Provider>
  );
}

export default CSVDataContextProvider;

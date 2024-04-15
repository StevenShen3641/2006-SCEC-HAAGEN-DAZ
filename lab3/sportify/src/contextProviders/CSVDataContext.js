import { useState, useEffect, createContext } from "react";
import Papa from "papaparse";
import Data from "../data/data2.csv";

export const CSVDataContext = createContext();

function CSVDataContextProvider({ children }) {
  const [csvData, setCsvData] = useState();
  const userState = Object.freeze({
    PRECHECKIN: 1,
    CHECKIN: 2,
    PLAYING: 3,
    DEFAULT: 0,
  });

  let statusObject = localStorage.getItem("status")
    ? JSON.parse(localStorage.getItem("status"))
    : {};

  function add(index) {
    const status = {
      preCheckIn: randomIntFromInterval(0, 15),
      checkIn: randomIntFromInterval(0, 15),
      playing: randomIntFromInterval(0, 15),
      preCheckInFlag: false,
      checkInFlag: false,
      playingFlag: false,
      status: userState.DEFAULT,
    };
    statusObject[index] = status;
    localStorage.setItem("status", JSON.stringify(statusObject));
  }

  useEffect(() => {
    // localStorage.setItem("status", "");
    if (csvData) {
      for (let i = 0; i < csvData.length; i++) {
        if (!statusObject.hasOwnProperty(i)) {
          add(i);
        }
      }
      // console.log(statusObject);
    }
  }, [csvData]);

  useEffect(() => {
    if (csvData) {
      for (let data of csvData) {
        if (data["Sports"]) {
          data["Sports"] = data["Sports"]
            .toLowerCase()
            .replace(/\(o\)/g, " (outdoor)")
            .replace(/\(i\)/g, " (indoor)")
            .replace("soccer", "football");
        }
      }
      setCsvData(csvData);
    }
  }, [csvData]);

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

      setCsvData(parsedData);
    };
    fetchData();
  }, []);

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <CSVDataContext.Provider
      value={{
        data: csvData,
      }}
    >
      {children}
    </CSVDataContext.Provider>
  );
}

export default CSVDataContextProvider;

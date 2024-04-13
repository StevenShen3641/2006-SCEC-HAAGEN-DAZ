import { useState, useEffect,createContext } from "react";
import Papa from "papaparse";
import Data from "../data/data2.csv";

export const CSVDataContext = createContext();

function CSVDataContextProvider({children}) {
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
      }
      setCsvData(parsedData);
    };
    fetchData();
  }, []);

  return(
    <CSVDataContext.Provider value={{csvData, setCsvData}}>{children}</CSVDataContext.Provider>
  );
}

export default CSVDataContextProvider;

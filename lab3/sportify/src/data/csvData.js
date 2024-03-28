import { useState, useEffect } from "react";
import Papa from "papaparse";
import Data from "./data2.csv";

function useCSVData() {
  const [csvData, setCsvData] = useState([]);

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

  return csvData;
}

export default useCSVData;

import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import './Table.css';

const CsvTable = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  // Function to fetch the CSV
  const fetchCsv = async () => {
    const response = await fetch(`${process.env.PUBLIC_URL}/data/data.csv`);

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    const result = await reader.read();
    return decoder.decode(result.value);
  };

  // Function to process the CSV data
  const getCsvData = async () => {
    try {
      const csvData = await fetchCsv();
      const results = Papa.parse(csvData, { header: true });

      if (results.data.length > 0) {
        // Set headers from the first row
        setHeaders(Object.keys(results.data[0]));
      }

      setData(results.data);
    } catch (error) {
      console.error("Error processing CSV data:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getCsvData();
  }, []);

  return (
    <div className="table-div">
      <h1>CSV traffic data!</h1>
      {data.length > 0 ? (
        <table className="table-div-table" border="1">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td key={colIndex} data-label={header}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : ( <p>Loading...</p>
      )}
    </div>
  );
};

export default CsvTable;

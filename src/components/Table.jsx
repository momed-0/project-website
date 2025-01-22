import React, { useState, useEffect } from "react";
import './Table.css';

const TrafficDataTable = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Function to fetch data from the API

  useEffect(() => {
    const fetchTrafficDataInitial = async () => {
      try {
        const response = await fetch('https://50vrn9obe2.execute-api.us-east-1.amazonaws.com/API1/Count?start_time=1737184640&end_time=1737184651');
          
  
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
  
        
  
        if (result && result.length > 0) {
          
          // Extract headers dynamically from the first object
          setHeaders(Object.keys(result[0]));
          // Set data to state
          setData(result);
        } else {
          setData([]);
          alert("No data found for the provided time range.");
        }
      } catch (error) {
        console.error("Error fetching traffic data:", error);
      }
    };

    fetchTrafficDataInitial();
  }, []);
  const fetchTrafficData = async () => {
    if (!startTime || !endTime) {
      alert("Please provide both start time and end time!");
      return;
    }

    try {
      const response = await fetch('https://50vrn9obe2.execute-api.us-east-1.amazonaws.com/API1/Count?start_time=1737184640&end_time=1737184651');
        


    


      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      

      if (result && result.length > 0) {
        
        // Extract headers dynamically from the first object
        setHeaders(Object.keys(result[0]));
        // Set data to state
        setData(result);
      } else {
        setData([]);
        alert("No data found for the provided time range.");
      }
    } catch (error) {
      console.error("Error fetching traffic data:", error);
    }
  };

  // Render table or message based on data
  const renderTable = () => {
    if (data.length === 0) {
      return <p>No data available for the selected time range.</p>;
    }

    return (
      <table className="table-div-table">
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
                <td key={colIndex} data-label={header}>
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="table-div">
      <h1>Traffic Data</h1>
      <div>
        <label>
          Start Time:{" "}
          <input
            type="number"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            placeholder="Enter start time"
          />
        </label>
        <label>
          End Time:{" "}
          <input
            type="number"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            placeholder="Enter end time"
          />
        </label>
        <button onClick={fetchTrafficData}>Fetch Data</button>
      </div>
      <div>{data.length > 0 ? renderTable() : <p>Loading...</p>}</div>
    </div>
  );
};

export default TrafficDataTable;

import React, { useState, useEffect } from "react";
import './Table.css';



const TrafficDataTable = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Initial data fetch
  useEffect(() => {
    const fetchTrafficDataInitial = async () => {
      try {
        const response = await fetch(
          'https://50vrn9obe2.execute-api.us-east-1.amazonaws.com/API1/Count?start_time=1737184640&end_time=1737184651'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result && result.length > 0) {
          setHeaders(Object.keys(result[0])); // Extract headers dynamically
          setData(result); // Set data to state
        } else {
          setData([]);
          alert('No data found for the provided time range.');
        }
      } catch (error) {
        console.error('Error fetching traffic data:', error);
        alert('Failed to fetch traffic data. Please try again later.');
      }
    };

    fetchTrafficDataInitial();
  }, []);

  // Fetch data based on user input
  const fetchTrafficData = async () => {
    if (!startTime || !endTime) {
      alert('Please provide both start time and end time!');
      return;
    }

    try {
      const response = await fetch(
        `https://50vrn9obe2.execute-api.us-east-1.amazonaws.com/API1/Count?start_time=${startTime}&end_time=${endTime}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result && result.length > 0) {
        setHeaders(Object.keys(result[0]));
        setData(result);
      } else {
        setData([]);
        alert('No data found for the provided time range.');
      }
    } catch (error) {
      console.error('Error fetching traffic data:', error);
      alert('Failed to fetch traffic data. Please try again later.');
    }
  };

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

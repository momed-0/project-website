
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Map from './components/map';

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <Table />
    </div>
    <Routes>
        <Route path="/" />
        <Route path="/Map" element={<Map />} />
    </Routes>
    </Router>
    
  );
}

export default App;

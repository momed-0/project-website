import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header>
      <nav className="header-nav">
        <ul className="header-div-ul">
          <li>
            <a href="/" className="nav-link">Home</a>
          </li>
          <li>
            <a href="/Map" className="nav-link">Map</a> {/* Redirects to /map */}
          </li>
          <li>
            <a href="/x" className="nav-link">X</a>
          </li>
          <li>
            <a href="/y" className="nav-link">Y</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

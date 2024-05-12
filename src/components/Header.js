import React from 'react';
import { Link } from 'react-router-dom';
import '../css/css.css';

const Header = () => (
  <header className="headerContainer">
    <h1 className="title">INFO 442 Pet Diagnosis Adviser Tool</h1>
    <nav>
      <Link to="/" className="button">Chatbot Page</Link>
      <Link to="/map" className="button">Map Page</Link>
    </nav>
  </header>
);

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/css.css';

const Header = () => (
  <aside className="headerContainer">
    <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className="logo" />
    <h1 className="title">PETPAL: Pet Symptoms Advising Chatbot</h1>
    <nav>
      <Link to="/" className="button">Chatbot Page</Link>
      <Link to="/map" className="button">Map Page</Link>
      <Link to="/about" className="button">About Us</Link>
    </nav>
  </aside>
);

export default Header;

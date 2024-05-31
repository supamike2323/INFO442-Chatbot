// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import '../css/css.css';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <aside className="headerContainer">
      <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className="logo" />
      <h1 className="title">PETPAL: Pet Symptoms Advising Tools</h1>
      <nav>
        <Link to="/" className="button">Chatbot Page</Link>
        <Link to="/map" className="button">Map Page</Link>
        <Link to="/forum" className="button">Forum</Link>
        <Link to="/about" className="button">About Us</Link>
        {user ? (
          <button onClick={handleLogout} className="button">Logout</button>
        ) : (
          <>
            <Link to="/login" className="button">Login/SignUp</Link>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Header;

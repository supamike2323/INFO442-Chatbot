// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import MapPage from './components/MapPage';
import AboutUs from './components/Aboutus';
import Forum from './components/Forum';
import PostDetail from './components/PostDetail';
import Login from './components/Login';
import Signup from './components/Signup';
import './css/css.css';

function App() {
  return (
    <Router>
      <div className="appContainer">
        <Header />
        <Routes>
          <Route path="/" element={<Chatbot />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

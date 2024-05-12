import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import MapPage from './components/MapPage';
import './css/css.css';

function App() {
  return (
    <Router>
      <div className="appContainer">
        <Header />
        <Routes>
          <Route path="/" element={<Chatbot />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

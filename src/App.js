import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import './css/css.css';

function App() {
  return (
    <div className="appContainer">
      <Header />
      <Chatbot />
    </div>
  );
}

export default App;

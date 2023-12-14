import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Game1 from './Game1';
import Game2 from './Game2';
import '../assets/App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Sayı Tahmin Oyunu</h1>
        <div className="button-container">
          <Link to="/game1" className="game-button">Oyun 1</Link>
          <Link to="/game2" className="game-button">Oyun 2</Link>
        </div>
        <Routes>
          <Route path="/game1" element={<Game1 />} />
          <Route path="/game2" element={<Game2 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

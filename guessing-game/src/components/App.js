import React, { useState } from 'react';
import Game1 from './Game1';
import Game2 from './Game2';
import '../assets/App.css';

const App = () => {
  const [currentGame, setCurrentGame] = useState(null);

  return (
    <div className="App">
      <h1>Sayı Tahmin Oyunu</h1>
      <div>
        <button onClick={() => setCurrentGame('Game1')}>Oyun 1</button>
        <button onClick={() => setCurrentGame('Game2')}>Oyun 2</button>
      </div>
      {currentGame === 'Game1' && <Game1 />}
      {currentGame === 'Game2' && <Game2 />}
    </div>
  );
};

export default App;

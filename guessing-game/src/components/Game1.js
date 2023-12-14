import React, { useState } from 'react';
import GuessForm from './GuessForm';
import Results from './Results';
import '../assets/Game1.css';

const Game1 = () => {
  const [minNumber, setMinNumber] = useState();
  const [maxNumber, setMaxNumber] = useState();
  const [secretNumber, setSecretNumber] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [isWin, setIsWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [trialCount, setTrialCount] = useState(0);
  const [maxTrials, setMaxTrials] = useState(3); // Deneme hakkı sayısı

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const startGame = () => {
    setSecretNumber(generateRandomNumber(minNumber, maxNumber));
    if (minNumber < maxNumber) {
      setGameStarted(true);
      setTrialCount(0); // Oyun başladığında deneme hakkı sayısını sıfırla
      setMessage('Oyun başladı. İyi şanslar!');
    } else {
      setMessage('Aralık durumunun yanlış ayarladınız');
    }
  };

  const handleMinNumberChange = (event) => {
    setMinNumber(parseInt(event.target.value));
  };

  const handleMaxNumberChange = (event) => {
    setMaxNumber(parseInt(event.target.value));
  };

  const handleGuess = (guess) => {

    setUserGuess(guess);
    setTrialCount(trialCount + 1); // Her tahminde deneme hakkını artır

    if (trialCount >= maxTrials - 1) {
      // Deneme hakkı aşıldığında oyunu kaybet
      setMessage(`Deneme hakkınız bitti. Doğru cevap: ${secretNumber}. Oyunu kaybettiniz.`);
      setIsWin(false);
      return;
    }

    const guessNumber = parseInt(guess);

    if (guessNumber < minNumber || guessNumber > maxNumber) {
      setMessage(`Lütfen ${minNumber} ile ${maxNumber} arasında bir sayı girin.`);
    } else if (guessNumber === secretNumber) {
      setIsWin(true);
      setMessage(`Tebrikler, doğru tahmin ettiniz! Doğru cevap: ${secretNumber}. Oyunu kazandınız.`);
    } else {
      const difference = Math.abs(guessNumber - secretNumber);
      if (difference <= 10) {
        setMessage(guessNumber - secretNumber > 0 ? 'Çok yaklaştın. Küçük sayı giriniz.' : 'Çok yaklaştın. Büyük sayı giriniz.');
      } else if (difference <= 20) {
        setMessage('Ha gayret!');
      } else {
        setMessage('Farklı bir sayı tahmin edin.');
      }
    }
  };

  const handleNewGame = () => {
    setSecretNumber(generateRandomNumber(minNumber, maxNumber));
    setUserGuess('');
    setMessage('Yeni oyun başladı. İyi şanslar!');
    setIsWin(false);
    setGameStarted(true);
    setTrialCount(0);
  };

  return (
    <div className="game-container">
      {!gameStarted && (
        <div className="input-container">
          <label>
            Başlangıç Sayısı:
            <input type="number" value={minNumber} onChange={handleMinNumberChange} />
          </label>
          <label>
            Bitiş Sayısı:
            <input type="number" value={maxNumber} onChange={handleMaxNumberChange} />
          </label>
          <label>
            Deneme Hakkı:
            <input type="number" value={maxTrials} onChange={(e) => setMaxTrials(parseInt(e.target.value))} />
          </label>
          <button className="start-button" onClick={startGame}>Oyuna Başla</button>
        </div>
      )}
      {gameStarted && (
        <>
          <GuessForm handleGuess={handleGuess} />
          <Results message={message} isWin={isWin} />
          {(isWin || trialCount >= maxTrials) && <button className="new-game-button" onClick={handleNewGame}>Yeni Oyun</button>}
        </>
      )}
    </div>
  );
};

export default Game1;

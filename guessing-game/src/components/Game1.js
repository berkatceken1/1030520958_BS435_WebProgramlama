import React, { useState } from 'react';
import GuessForm from './GuessForm';
import Results from './Results';
 
const Game1 = () => {
  const [minNumber, setMinNumber] = useState();
  const [maxNumber, setMaxNumber] = useState();
  const [secretNumber, setSecretNumber] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [isWin, setIsWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const startGame = () => {
    setSecretNumber(generateRandomNumber(minNumber, maxNumber));
    if (minNumber < maxNumber) {
      setGameStarted(true);
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
    if (!gameStarted) {
      setMessage('Oyun başlatılmadı!');
      return;
    }

    setUserGuess(guess);
    const guessNumber = parseInt(guess);

    if (guessNumber < minNumber || guessNumber > maxNumber) {
      setMessage(`Lütfen ${minNumber} ile ${maxNumber} arasında bir sayı girin.`);
    } else if (guessNumber === secretNumber) {
      setIsWin(true);
      setMessage('Tebrikler, doğru tahmin ettiniz! Doğru cevap:' + secretNumber);
    } else {
      const difference = Math.abs(guessNumber - secretNumber);
      if (difference <= 10) {
        if (guessNumber - secretNumber > 0) {
          setMessage('Çok yaklaştın. Küçük sayı giriniz.');
        } else if (guessNumber - secretNumber < 0) {
          setMessage('Çok yaklaştın. Büyük sayı giriniz.');
        }
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
    setMessage('');
    setIsWin(false);
    setGameStarted(false);
  };

  return (
    <div>
      <div>
        <label>
          Başlangıç Sayısı:
          <input type="number" value={minNumber} onChange={handleMinNumberChange} />
        </label>
        <label>
          Bitiş Sayısı:
          <input type="number" value={maxNumber} onChange={handleMaxNumberChange} />
        </label>
        <button onClick={startGame}>Oyuna Başla</button>
      </div>
      <GuessForm handleGuess={handleGuess} />
      <Results message={message} isWin={isWin} />
      {isWin && <button onClick={handleNewGame}>Yeni Oyun</button>}
    </div>
  );
};

export default Game1;

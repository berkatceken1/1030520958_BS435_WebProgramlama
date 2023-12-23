import React, { useState } from 'react';

const Game2 = () => {
  const [targetNumber, setTargetNumber] = useState(0); // Hedef sayı
  const [startingNumbers, setStartingNumbers] = useState([]); // Başlangıç sayıları
  const [userExpression, setUserExpression] = useState(''); // Kullanıcının ifadesi (işlem)
  const [message, setMessage] = useState(''); // Oyun mesajı
  const [isWin, setIsWin] = useState(false); // Kullanıcının kazanıp kazanmadığını gösteren bayrak
  const [maxAttempts, setMaxAttempts] = useState(3); // Maksimum deneme hakkı
  const [isNewGame, setIsNewGame] = useState(true); // Yeni oyun başladığını belirtme

  // Hedef sayıyı ve başlangıç sayılarını rastgele oluşturan fonksiyon
  const generateNumbers = () => {
    const randomTarget = Math.floor(Math.random() * 100) + 1; // 1 ile 100 arasında rastgele hedef sayı
    const randomStartNumbers = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10) + 1); // 4 rastgele başlangıç sayısı
    setTargetNumber(randomTarget);
    setStartingNumbers(randomStartNumbers);
    setUserExpression('');
    setMessage('');
    setIsWin(false);
    setIsNewGame(false); // Yeni oyun başladığını işaretleyin
  };

  // Kullanıcının ifadesini değerlendiren fonksiyon
  const evaluateExpression = () => {
    try {
      const result = eval(userExpression); // Kullanıcının girdiği ifadeyi hesapla
      if (result === targetNumber) {
        setIsWin(true);
        setMessage('Tebrikler, doğru ifadeyi buldunuz.');
      } else {
        setMessage('Üzgünüm, hedefe ulaşamadınız.');
      }
    } catch (error) {
      setMessage('Geçersiz ifade, lütfen tekrar deneyin.');
    }
  };

  // Yeni bir oyun başlatan fonksiyon
  const startNewGame = () => {
    generateNumbers();
    setMaxAttempts(3); // Yeni oyun başladığında deneme hakkını sıfırla
    setIsNewGame(true); // Yeni oyun başladı
  };

  // Kullanıcının tahmin hakkını değerlendiren fonksiyon
  const handleAttempt = () => {
    if (maxAttempts > 1) {
      setMaxAttempts(maxAttempts - 1);
      evaluateExpression();
    } else {
      setMaxAttempts(maxAttempts - 1);
      evaluateExpression();
      setMessage('Deneme hakkınız bitti. Oyunu kaybettiniz.');
    }
  };

  return (
    <div>
      <h2>Sayılar ve Operatörler Oyunu</h2>
      {!targetNumber || isNewGame ? (
        <>
          <button onClick={generateNumbers}>Oyuna Başla</button>
          <label>
            Deneme Hakkı: 
            <input
              type="number"
              value={maxAttempts}
              onChange={(e) => setMaxAttempts(parseInt(e.target.value))}
              min="1"
            />
          </label>
        </>
      ) : (
        <>
          <p>Hedef Sayı: {targetNumber}</p>
          <p>Başlangıç Sayıları: {startingNumbers.join(', ')}</p>
          <p>Deneme Hakkı: {maxAttempts}</p>
          <input
            type="text"
            value={userExpression}
            onChange={(e) => setUserExpression(e.target.value)}
            disabled={maxAttempts === 0}
          />
          <button onClick={handleAttempt} disabled={maxAttempts === 0}>Tahmin Et</button>
          <p>{message}</p>
          {(isWin || maxAttempts === 0) && <button onClick={startNewGame}>Yeni Oyun</button>}
        </>
      )}
    </div>
  );
};

export default Game2;
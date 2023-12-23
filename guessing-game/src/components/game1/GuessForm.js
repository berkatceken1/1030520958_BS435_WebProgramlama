import React, { useState } from 'react';

const GuessForm = ({ handleGuess }) => {
  const [userGuess, setUserGuess] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value === '' || (parseInt(value) >= 0 && !value.includes('.'))) {
      setUserGuess(value);
    }
    // Eğer girilen değer boşsa veya pozitif bir tam sayıysa, setUserGuess ile güncellenir
    // Ayrıca girilen değerin içerisinde ondalık nokta (.) bulunmaması gerekiyor.
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleGuess(userGuess);
    setUserGuess('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={userGuess}
        onChange={handleInputChange}
        placeholder="Tahmininizi Girin"
        className="guess-input"
      />
      <button type="submit" className="guess-button">Tahmin Et</button>
    </form>
  );
};

export default GuessForm;

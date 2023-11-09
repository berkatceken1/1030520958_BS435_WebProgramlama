import React, { useState } from 'react';

const GuessForm = ({ handleGuess, setUserGuess }) => {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleGuess(userInput);
    setUserInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button type="submit">Tahmin Et</button>
    </form>
  );
};

export default GuessForm;

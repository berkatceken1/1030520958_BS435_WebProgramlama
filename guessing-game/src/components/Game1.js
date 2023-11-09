import React, { useState } from 'react';
import GuessForm from './GuessForm';
import Results from './Results';

const Game1 = () => {
  const [isCorrect, setIsCorrect] = useState();

  const handleGuess = (guess) => {
    const correctAnswer = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    if (parseInt(guess) === correctAnswer) {
      setIsCorrect(true); // Tahmin doğruysa 'isCorrect' durumunu 'true' yap
    } else {
      setIsCorrect(false); // Tahmin yanlışsa 'isCorrect' durumunu 'false' yap
    }
  };

  return (
    <div>
      <GuessForm handleGuess={handleGuess} />
      <Results isCorrect={isCorrect} />
    </div>
  );
};

export default Game1;

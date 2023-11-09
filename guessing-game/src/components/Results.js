import React from 'react';

const Results = ({ isCorrect }) => {
  return (
    <div>
      {isCorrect === true ? <p>Tebrikler, kazandınız!</p> : isCorrect === false ? <p>Kaybettiniz</p> : null}
    </div>
  );
};

export default Results;

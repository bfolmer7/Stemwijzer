import React from 'react';
import './styles.css'; 

function Question({ question, onAnswer }) {
  return (
    <div className="question-container">
      <h2 className="question-title">{question.questionText}</h2>
      <div className="question-buttons">
        <button className="button-yes" onClick={() => onAnswer("Eens")}>Eens</button>
        <button className="button-neutral" onClick={() => onAnswer("Geen van beide")}>Geen van beide</button>
        <button className="button-no" onClick={() => onAnswer("Oneens")}>Oneens</button>
      </div>
    </div>
  );
}

export default Question;

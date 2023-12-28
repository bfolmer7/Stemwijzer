import React, { useState } from 'react';
import Question from './Question';
import ProgressBar from './ProgressBar';
import Result from './Result';
import './styles.css';


const questions = [
  {
    questionText: "De accijns op benzine, gas en diesel moet omlaag.",
    answers: {
      "Eens": { VVD: 1, D66: -1},
      "Oneens": { VVD: -1, D66: 1},
      "Geen van beide": { VVD: 0, D66: 0},
    },
  },
  {
    questionText: "De regering moet ervoor zorgen dat Surinamers zonder visum naar Nederland kunnen reizen.",
    answers: {
      "Eens": { VVD: -1, D66: 1},
      "Oneens": { VVD: 1, D66: -1},
      "Geen van beide": { VVD: 0, D66: 0},
    },
  },
  {
    questionText: "De overheid moet meer geld geven aan school voor lessen in kunst en cultuur.",
    answers: {
      "Eens": { VVD: -1, D66: 1},
      "Oneens": { VVD: 1, D66: -1},
      "Geen van beide": { VVD: 0, D66: 0},
    },
  },
  {
    questionText: "De belasting op vliegreizen moet omhoog.",
    answers: {
      "Eens": { VVD: -1, D66: 1},
      "Oneens": { VVD: 1, D66: -1},
      "Geen van beide": { VVD: 0, D66: 0},
    },
  },
  {
    questionText: "De belasting op vermogen boven 57.000 euro moet omhoog.",
    answers: {
      "Eens": { VVD: -1, D66: 1},
      "Oneens": { VVD: 1, D66: -1},
      "Geen van beide": { VVD: 0, D66: 0},
    },
  },
  {
    questionText: "Het minimumloon moet binnen drie jaar van 11,51 euro bruto per uur naar 16 euro gaan.",
    answers: {
      "Eens": { VVD: -1, D66: 1},
      "Oneens": { VVD: 1, D66: -1},
      "Geen van beide": { VVD: 0, D66: 0},
    },
  },
  {
    questionText: "De regering moet ervoor zorgen dat de hoeveelheid vee minstens de helft kleiner wordt.",
    answers: {
      "Eens": { VVD: -1, D66: 1},
      "Oneens": { VVD: 1, D66: -1},
      "Geen van beide": { VVD: 0, D66: 0},
    },
  },
  {
    questionText: "Kinderopvang mag alleen worden aangeboden door organisaties die geen winst maken.",
    answers: {
      "Eens": { VVD: -1, D66: 1},
      "Oneens": { VVD: 1, D66: -1},
      "Geen van beide": { VVD: 0, D66: 0},
    },
  },
  {
    questionText: "Als een vluchteling in Nederland mag blijven, mag het gezin nu naar Nederland komen. De regering moet dat beperken.",
    answers: {
      "Eens": { VVD: 1, D66: -1},
      "Oneens": { VVD: -1, D66: 1},
      "Geen van beide": { VVD: 0, D66: 0},
    },
  },
  {
    questionText: "Er moeten minimumstraffen komen voor mensen die zwaar geweld gebruiken.",
    answers: {
      "Eens": { VVD: 1, D66: -1},
      "Oneens": { VVD: -1, D66: 1},
      "Geen van beide": { VVD: 0, D66: 0},
    },
  },
  {
    questionText: "Als je recht hebt op een uitkering en je woont samen, moet je hetzelfde bedrag krijgen als wanneer je alleen woont.",
    answers: {
      "Eens": { VVD: -1, D66: -1},
      "Oneens": { VVD: 1, D66: 1},
      "Geen van beide": { VVD: 0, D66: 0},
    },
  },
  {
    questionText: "Mensen die vinden dat ze klaar zijn met hun leven, moeten hulp kunnen krijgen bij zelfdoding.",
    answers: {
      "Eens": { VVD: 1, D66: 1},
      "Oneens": { VVD: -1, D66: -1},
      "Geen van beide": { VVD: 0, D66: 0},
    },
  },
  {
    questionText: "De regering moet het afsteken van vuurwerk door particulieren helemaal verbieden.",
    answers: {
      "Eens": { VVD: -1, D66: 1},
      "Oneens": { VVD: 1, D66: -1},
      "Geen van beide": { VVD: 0, D66: 0},
    },
  },
  {
    questionText: "De regering moet ervoor zorgen dat er in 2030 minstens de helft minder stikstof in de lucht komt.",
    answers: {
      "Eens": { VVD: -1, D66: 1},
      "Oneens": { VVD: 1, D66: -1},
      "Geen van beide": { VVD: 0, D66: 0},
    },
  },
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({ VVD: 0, D66: 0});
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false); 
  const [closestParty, setClosestParty] = useState('');
  const totalQuestions = questions.length;

  const handleAnswer = (answerKey) => {
    const currentScores = questions[currentQuestionIndex].answers[answerKey];
    let updatedScores = { ...scores };

    Object.keys(currentScores).forEach(party => {
      updatedScores[party] += currentScores[party];
    });

    setScores(updatedScores);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setFinished(true);
      const finalClosestParty = getClosestParty(updatedScores);
      setClosestParty(finalClosestParty);
    }
  };

  const getClosestParty = (finalScores) => {
    let maxScore = -Infinity;
    let closestParty = "";

    Object.entries(finalScores).forEach(([party, score]) => {
      if (score > maxScore) {
        maxScore = score;
        closestParty = party;
      }
    });

    return closestParty;
  };

  const startQuiz = () => {
    setStarted(true);
  };

  if (finished) {
    return <Result closestParty={closestParty} />;
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="progress-container">
          <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} />
          <span className="progress-text">{currentQuestionIndex + 1}/{totalQuestions}</span>
        </div>
      </header>
      <main className="main-content">
        {started ? (
          <>
            <Question question={questions[currentQuestionIndex]} onAnswer={handleAnswer} />
            <div className="navigation-buttons">
              {currentQuestionIndex < totalQuestions - 1 ? (
                <button className="skip-button" onClick={() => handleAnswer("Geen van beide")}>Overslaan →</button>
              ) : null}
            </div>
          </>
        ) : (
          <button onClick={startQuiz} className="start-button">
            Start
          </button>
        )}
      </main>
    </div>
  );
}


export default App;

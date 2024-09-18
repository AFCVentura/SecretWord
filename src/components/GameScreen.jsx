import React, { useRef, useState } from "react";
import "./GameScreen.css";

const GameScreen = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);
    letterInputRef.current.focus();

    setLetter("");
  };

  return (
    <div className="game">
      <p className="points">
        <span>{score} Pontos</span>
      </p>
      <h1>Advinhe a palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p className="textTries">
        Você ainda tem <span>{guesses}</span> tentativa(s)
      </p>
      <div className="wordContainer">
        {letters.map((letter, id) => {
          return guessedLetters.includes(letter.toLowerCase()) ? (
            <div key={id} className="letterContainer">
              <span className="letter">{letter}</span>
            </div>
          ) : (
            <div key={id} className="letterContainer"></div>
          );
        })}
      </div>
      <div className="letterInputContainer">
        <p>Escolha um caractere</p>
        <form onSubmit={handleSubmit}>
          <input
            ref={letterInputRef}
            type="text"
            name="letter"
            maxLength={1}
            required
            onChange={(e) => {
              setLetter(e.target.value);
            }}
            value={letter}
          />
          <button className="buttonLetter">Escolher</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Caracteres já utilizadas:</p>
        <span>
          {wrongLetters.map((letter) => {
            return letter.toUpperCase();
          })}
        </span>
      </div>
    </div>
  );
};

export default GameScreen;

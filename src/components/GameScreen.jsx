import React from "react";
import "./GameScreen.css";

const GameScreen = ({ verifyLetter }) => {
  return (
    <div>
      <h1>* Jogando * </h1>
      <button onClick={verifyLetter}>Encerrar jogo</button>
    </div>
  );
};

export default GameScreen;

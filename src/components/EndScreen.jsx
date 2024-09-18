import React from "react";
import "./EndScreen.css";

const EndScreen = ({ retry, score }) => {
  return (
    <div className="end">
      <h1>Final do jogo</h1> 
      <h2>Sua pontuação foi <span className="scoreSpan">{score}</span></h2>
      <button onClick={retry}>Recomeçar jogo</button>
    </div>
  );
};

export default EndScreen;

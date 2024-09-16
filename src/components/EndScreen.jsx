import React from "react";
import "./EndScreen.css";

const EndScreen = ({ retry }) => {
  return (
    <div>
      <h1>final do jogo</h1> 
      <button onClick={retry}>Recomeçar jogo</button>
    </div>
  );
};

export default EndScreen;

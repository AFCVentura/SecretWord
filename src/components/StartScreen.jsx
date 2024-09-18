import React from 'react';
import './StartScreen.css';

const StartScreen = ({ startGame }) => {
    return (
        <div className='start'>
            <h1>Secret Word</h1>
            <p>Dica: você não precisa se preocupar com sinais gráficos, mas algumas palavras podem conter símbolos</p>
            <button onClick={startGame}>Começar jogo</button>
        </div>
    );
}

export default StartScreen;

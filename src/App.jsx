// CSS
import "./App.css";

// React
import React, { useEffect, useState } from "react";

// Data
import { wordsList } from "./data/Word";
import EndScreen from "./components/EndScreen";
import GameScreen from "./components/GameScreen";

// Components
import StartScreen from "./components/StartScreen";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 5;

const App = () => {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  };

  const normalizedLetters = letters.map((letter) =>
    letter
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
  );
  const startGame = () => {
    clearLetterStates();
    //pick word and category
    let { word, category } = pickWordAndCategory();

    // word.normalize('NFD').replace(/\p{Diacritic}/gu, '').split(""); to remove diacritcs
    let wordLetters = word.split("");

    setPickedWord(word);
    category = category.charAt(0).toUpperCase() + category.slice(1); // first letter to upper case
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };

  const verifyLetter = (letter) => {
    const normalizedGuessLetter = letter
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");

    if (
      guessedLetters.includes(normalizedGuessLetter) ||
      wrongLetters.includes(normalizedGuessLetter)
    ) {
      return;
    }

    if (normalizedLetters.includes(normalizedGuessLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedGuessLetter,
      ]); // unindo o que já tinha do array a algo a mais
      return normalizedLetters;
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedGuessLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    // Faz com que o array gerado seja o array letters sem repetir valores.

    const uniqueLetters = [...new Set(normalizedLetters)];
    // Isso é importante para que, la lógica de confirmar vitória, o usuário não precise ter digitado duas ou mais vezes a mesma letra

    if (guessedLetters.length === uniqueLetters.length && guessedLetters.length != 0) {
      setScore((actualScore) => (actualScore += guessedLetters.length * 10));
      startGame();
    }
  }, [guessedLetters]);

  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <GameScreen
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <EndScreen retry={retry} score={score} />}
    </div>
  );
};

export default App;

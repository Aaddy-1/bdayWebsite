import React, { useState, useEffect, useCallback } from "react";
import Keyboard from "./Keyboard";
import { useNavigate } from "react-router-dom";
import "./WordleGame.css"; // Import styles

const TARGET_WORD = "aliza"; // Fixed solution
const HINT = "The most beautiful girl in the world :)"; // Example hint

const WordleGame = () => {
  const [targetWord, setTargetWord] = useState(TARGET_WORD);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [letterFeedback, setLetterFeedback] = useState({});
  const [showHint, setShowHint] = useState(false);
  const MAX_ATTEMPTS = 6;

  const getFeedback = (guess) => {
    return guess.split("").map((char, index) => {
      if (char === targetWord[index]) return "correct"; // Green 🟩
      if (targetWord.includes(char)) return "present"; // Yellow 🟨
      return "absent"; // Gray ⬜
    });
  };
  const navigate = useNavigate(); // Hook for navigation

  const handleKeyPress = useCallback(
    (key) => {
      if (gameOver) return;

      if (key === "ENTER" && currentGuess.length === 5) {
        const feedback = getFeedback(currentGuess);
        setGuesses([...guesses, { word: currentGuess, feedback }]);
        setLetterFeedback((prev) => ({ ...prev, ...feedback }));
        setCurrentGuess("");

        if (currentGuess === targetWord) {
          setGameOver(true);
          setTimeout(() => navigate("/success"), 700); // Navigate to success page
        }

        if (currentGuess === targetWord || guesses.length + 1 === MAX_ATTEMPTS) {
          setGameOver(true);
        }

        // Show hint if the user reaches the third attempt and hasn't guessed correctly
        if (guesses.length + 1 === 3 && currentGuess !== targetWord) {
          setShowHint(true);
        }

        return;
      }

      if (key === "BACKSPACE") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key.toLowerCase());
      }
    },
    [currentGuess, guesses, gameOver]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      handleKeyPress(event.key.toUpperCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);

  const handleReset = () => {
    setGuesses([]);
    setCurrentGuess("");
    setLetterFeedback({});
    setGameOver(false);
    setShowHint(false); // Reset hint when the game restarts
  };

  return (
    <div className="wordle-game">
      <h1>Wordle</h1>
      <div className="game-container">
        <div className="grid">
          {Array.from({ length: MAX_ATTEMPTS }).map((_, rowIndex) => {
            const guessData =
              rowIndex < guesses.length
                ? guesses[rowIndex]
                : rowIndex === guesses.length
                ? { word: currentGuess, feedback: [] }
                : { word: "", feedback: [] };

            return (
              <div key={rowIndex} className="word-row">
                {Array.from({ length: 5 }).map((_, colIndex) => {
                  const letter = guessData.word[colIndex] || "";
                  const feedbackClass =
                    rowIndex < guesses.length ? guessData.feedback[colIndex] || "" : "";

                  return (
                    <div key={colIndex} className={`letter-box ${feedbackClass}`}>
                      {letter}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {showHint && <div className="hint-box">💡 Hint: {HINT}</div>}
      </div>

      <Keyboard onKeyPress={handleKeyPress} letterFeedback={letterFeedback} />

      {gameOver && (
        <div className="game-over">
          <p>{guesses[guesses.length - 1]?.word === targetWord ? "🎉 You Won!" : `The word was: ${targetWord.toUpperCase()}`}</p>
          <button onClick={handleReset}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default WordleGame;

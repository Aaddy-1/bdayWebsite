import React from "react";
import "./Keyboard.css"; // Import styles

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const Keyboard = ({ onKeyPress, letterFeedback }) => {
  return (
    <div className="keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((letter) => {
            const feedbackClass = letterFeedback[letter.toLowerCase()] || "";
            return (
              <button
                key={letter}
                className={`key ${feedbackClass}`}
                onClick={() => onKeyPress(letter)}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
      <div className="keyboard-row">
        <button className="key wide" onClick={() => onKeyPress("ENTER")}>
          ENTER
        </button>
        <button className="key wide" onClick={() => onKeyPress("BACKSPACE")}>
          ⌫
        </button>
      </div>
    </div>
  );
};

export default Keyboard;

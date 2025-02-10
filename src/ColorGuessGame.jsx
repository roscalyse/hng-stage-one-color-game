import React, { useState, useEffect } from "react";

const generateSimilarColors = () => {
  const baseColor = Math.floor(Math.random() * 360); // Random hue
  return Array.from({ length: 6 }, (_, i) => `hsl(${(baseColor + i * 5) % 360}, 60%, 70%)`);
};

const ColorGuessGame = () => {
  const [colors, setColors] = useState(generateSimilarColors());
  const [targetColor, setTargetColor] = useState("");
  const [message, setMessage] = useState("Guess the correct color!");
  const [score, setScore] = useState(0);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newColors = generateSimilarColors();
    setColors(newColors);
    const randomColor = newColors[Math.floor(Math.random() * newColors.length)];
    setTargetColor(randomColor);
    setMessage("Guess the correct colour!");
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setMessage("Correct! 🎉");
      setScore((prevScore) => prevScore + 1);
  
      // Delay before starting a new game
      setTimeout(() => {
        startNewGame();
      }, 1000); // 1-second delay
    } else {
      setMessage("Wrong! Try again.");
    }
  };
  

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6" data-testid="gameInstructions">
        {message}
      </h1>
      
        <div
          className="card mb-6 rounded-lg shadow-lg border-2 border-gray-500"
          style={{ backgroundColor: targetColor }}
          data-testid="colorBox"
        ></div>
   
      <div className="flex justify-center">
        <div className="grid grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {colors.map((color) => (
            <button
              key={color}
              className="logo"
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color)}
              data-testid="colorOption"
            ></button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-lg" data-testid="gameStatus">
        Score: <span data-testid="score">{score}</span>
      </p>
      <button
        className="game-button"
        onClick={() => {
          setScore(0);
          startNewGame();
        }}
        data-testid="newGameButton"
      >
        New Game
      </button>
    </div>
  );
};

export default ColorGuessGame;

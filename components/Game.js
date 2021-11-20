import styles from "../styles/Game.module.scss";
import Board from "./Board";
import Square from "./Square";
import { useState, useEffect } from "react";

const defaultSquares = () => new Array(9).fill(null);

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Game = () => {
  const [squares, setSquares] = useState(defaultSquares());
  const [winner, setWinner] = useState(null);
  const [userwins, setUserwins] = useState(0);
  const [computerwins, setComputerwins] = useState(0);

  useEffect(() => {
    const isComputerTurn = squares.filter((square) => square !== null).length % 2 == 1 && squares.filter((square) => square !== null).length <= 8;

    const linesThatAre = (a, b, c) => {
      return lines.filter((squareIndexes) => {
        const squareValues = squareIndexes.map((index) => squares[index]);
        return JSON.stringify([a, b, c].sort()) === JSON.stringify(squareValues.sort());
      });
    };

    const emptyIndexes = squares.map((square, index) => (square === null ? index : null)).filter((val) => val !== null);
    const playerWon = linesThatAre("x", "x", "x").length > 0;
    const computerWon = linesThatAre("o", "o", "o").length > 0;

    if (playerWon && winner !== "Draw" && winner !== "o") {
      setWinner("x");
      setUserwins(userwins + 1);
    }
    if (computerWon && winner !== "Draw" && winner !== "x") {
      setWinner("o");
      setComputerwins(computerwins + 1);
    }
    const putComputerAt = (index) => {
      setTimeout(() => {}, 3000);
      let newSquares = squares;
      newSquares[index] = "o";
      setSquares([...newSquares]);
    };

    if (isComputerTurn) {
      const winingLines = linesThatAre("o", "o", null);
      if (winingLines.length > 0) {
        const winIndex = winingLines[0].filter((index) => squares[index] === null)[0];
        putComputerAt(winIndex);
        return;
      }

      const linesToBlock = linesThatAre("x", "x", null);
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter((index) => squares[index] === null)[0];
        putComputerAt(blockIndex);
        return;
      }

      const linesToContinue = linesThatAre("o", null, null);
      if (linesToContinue.length > 0) {
        putComputerAt(linesToContinue[0].filter((index) => squares[index] === null)[0]);
        return;
      }

      const randomIndex = emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
      putComputerAt(randomIndex);
    }
  }, [squares]);

  const handleSquareClick = (index) => {
    if (winner == null && squares[index] == null) {
      const isPlayerTurn = squares.filter((square) => square !== null).length % 2 === 0;
      if (isPlayerTurn) {
        let newSquares = squares;
        newSquares[index] = "x";
        setSquares([...newSquares]);
      }
    }
    if (squares.filter((square) => square !== null).length == 9) setWinner("Draw");
  };
  const resetGame = () => {
    setWinner(null);
    setSquares(defaultSquares());
  };

  const ShowReset = () => {
    return (
      <div className={styles.result} id={styles.black} onClick={() => resetGame()}>
        New Game 😝
      </div>
    );
  };
  const PlayerStats = () => {
    return (
      <div className={styles.stats}>
        <div>🧑🏽{userwins / 2}</div>
        <div>💻{computerwins}</div>
      </div>
    );
  };
  const ShowResult = () => {
    return (
      <div>
        {winner === "Draw" && (
          <div className={styles.result} id={styles.white}>
            Game Drawn 😐
          </div>
        )}
        {!!winner && winner === "x" && (
          <div className={styles.result} id={styles.green}>
            You Won 🥳
          </div>
        )}
        {!!winner && winner === "o" && (
          <div className={styles.result} id={styles.red}>
            Computer Won 😢
          </div>
        )}
        {(winner === "Draw" || winner === "x" || winner == "o") && ShowReset()}
      </div>
    );
  };

  return (
    <div className={styles.main}>
      <h1>Tic Tac Toe</h1>
      <PlayerStats />
      <Board>
        {squares.map((square, index) => (
          <Square key={index} x={square === "x" ? 1 : 0} o={square === "o" ? 1 : 0} onClick={() => handleSquareClick(index)} />
        ))}
      </Board>
      <ShowResult />
    </div>
  );
};

export default Game;

import styles from "../styles/Game.module.scss";
import Board from "./Board";
import Square from "./Square";
import PlayerStats from "./PlayerStats";
import Result from "./Result";
import linesThatAre from "../lib/checkLines";
import { useState, useEffect } from "react";

const defaultSquares = () => new Array(9).fill(null);

const Game = () => {
  const [squares, setSquares] = useState(defaultSquares());
  const [winner, setWinner] = useState(null);
  const [userwins, setUserwins] = useState(0);
  const [computerwins, setComputerwins] = useState(0);

  useEffect(() => {
    const isComputerTurn = squares.filter((square) => square !== null).length % 2 == 1 && squares.filter((square) => square !== null).length <= 8;

    const emptyIndexes = squares.map((square, index) => (square === null ? index : null)).filter((val) => val !== null);
    const playerWon = linesThatAre("x", "x", "x", squares).length > 0;
    const computerWon = linesThatAre("o", "o", "o", squares).length > 0;

    if (playerWon && winner !== "Draw" && winner !== "o") {
      setWinner("x");
      setUserwins(userwins + 1);
      return;
    }
    if (computerWon && winner !== "Draw" && winner !== "x") {
      setWinner("o");
      setComputerwins(computerwins + 1);
      return;
    }
    const putComputerAt = (index) => {
      setTimeout(() => {}, 3000);
      let newSquares = squares;
      newSquares[index] = "o";
      setSquares([...newSquares]);
    };

    if (isComputerTurn) {
      const winingLines = linesThatAre("o", "o", null, squares);
      if (winingLines.length > 0) {
        const winIndex = winingLines[0].filter((index) => squares[index] === null)[0];
        putComputerAt(winIndex);
        return;
      }

      const linesToBlock = linesThatAre("x", "x", null, squares);
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter((index) => squares[index] === null)[0];
        putComputerAt(blockIndex);
        return;
      }

      const linesToContinue = linesThatAre("o", null, null, squares);
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

  return (
    <div className={styles.main}>
      <h1>Tic Tac Toe</h1>
      <PlayerStats {...{ userwins, computerwins }} />
      <Board>
        {squares.map((square, index) => (
          <Square key={index} x={square === "x" ? 1 : 0} o={square === "o" ? 1 : 0} onClick={() => handleSquareClick(index)} />
        ))}
      </Board>
      <Result {...{ winner, setWinner, setSquares }} />
    </div>
  );
};

export default Game;

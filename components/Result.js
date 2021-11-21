import styles from "../styles/Game.module.scss";

const Result = (props) => {
  const ShowReset = (props) => {
    return (
      <div className={styles.result} id={styles.black} onClick={() => resetGame()}>
        New Game 😝
      </div>
    );
  };

  const defaultSquares = () => new Array(9).fill(null);

  const resetGame = () => {
    props.setWinner(null);
    props.setSquares(defaultSquares());
  };

  return (
    <div>
      {props.winner === "Draw" && (
        <div className={styles.result} id={styles.white}>
          Game Drawn 😐
        </div>
      )}
      {!!props.winner && props.winner === "x" && (
        <div className={styles.result} id={styles.green}>
          You Won 🥳
        </div>
      )}
      {!!props.winner && props.winner === "o" && (
        <div className={styles.result} id={styles.red}>
          Computer Won 😢
        </div>
      )}
      {(props.winner === "Draw" || props.winner === "x" || props.winner == "o") && ShowReset()}
    </div>
  );
};

export default Result;

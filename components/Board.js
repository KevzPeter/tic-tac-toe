import styles from "../styles/Game.module.scss";

function Board(props) {
  return <div className={styles.board} {...props} />;
}

export default Board;

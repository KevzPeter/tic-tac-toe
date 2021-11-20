import styles from "../styles/Game.module.scss";

function Square(props) {
  return (
    <div className={styles.square} {...props}>
      {props.x ? "x" : props.o ? "o" : ""}
    </div>
  );
}

export default Square;

import styles from "../styles/Game.module.scss";

const PlayerStats = (props) => {
  return (
    <div className={styles.stats}>
      <div>🧑🏽{props.userwins}</div>
      <div>💻{props.computerwins}</div>
    </div>
  );
};

export default PlayerStats;

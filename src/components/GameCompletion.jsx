import { useAppContext } from "../context/AppContext";
import styles from "../styles/GameCompletion.module.css";

export default function GameCompletion() {
  const { isGameCompleted, currentTime, moves, gridSize, resetGame } =
    useAppContext();

  if (!isGameCompleted) return null;

  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.completionModal}>
        <h2>🎉 Congratulations!</h2>
        <div className={styles.stats}>
          <div className={styles.stats}>
            Grid Size: {gridSize}x{gridSize}
          </div>
          <div>Time: {formatTime(currentTime)}</div>
          <div>Moves: {moves}</div>
        </div>
        <button onClick={resetGame} className={styles.playAgainButton}>
          Play Again
        </button>
      </div>
    </div>
  );
}

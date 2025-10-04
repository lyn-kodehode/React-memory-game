import styles from "../styles/Controls.module.css";
import { useAppContext } from "../context/AppContext";
import { backCards } from "../utils/cardImagesArray";

export default function Controls() {
  const {
    gridSize,
    setGridSize,
    backColor,
    setBackColor,
    isGameStarted,
    startGame,
    endGame,
    moves,
    currentTime,
  } = useAppContext();

  const gridSizes = [4, 6, 8, 10];

  //   console.log("Controls render:", { isGameStarted, currentTime, moves });

  return (
    <div className={styles.controlsContainer}>
      {/* Game controls */}
      <div className={styles.gameControls}>
        {!isGameStarted ? (
          <button onClick={startGame} className={styles.startBtn}>
            Start Game
          </button>
        ) : (
          <button onClick={endGame} className={styles.endBtn}>
            End Game
          </button>
        )}
      </div>

      {/* Settings - disabled when game is running */}
      <div className={styles.controlGroup}>
        <label>Grid Size: </label>
        <select
          value={gridSize}
          onChange={(event) => setGridSize(event.target.value)}
          disabled={isGameStarted}
        >
          {gridSizes.map((size) => (
            <option key={size} value={size}>
              {size}x{size}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.controlGroup}>
        <label>Back Color: </label>
        <select
          value={backColor}
          onChange={(event) => setBackColor(event.target.value)}
          disabled={isGameStarted}
        >
          {backCards.map((color, index) => (
            <option key={index} value={color}>
              {color.split("/").pop().replace("back-", "").replace(".png", "")}
            </option>
          ))}
        </select>
      </div>

      {/* Game Stats */}
      <div className={styles.gameStats}>
        <div>Moves: {moves}</div>
        <div>Time: {Math.floor(currentTime / 1000)}s</div>
      </div>
    </div>
  );
}

import styles from "../styles/HeaderComponent.module.css";
import Controls from "./Controls";

export default function HeaderComponent() {
  return (
    <header className={styles.headerContainer}>
      <h1>Memory Game</h1>
      <Controls />
    </header>
  );
}

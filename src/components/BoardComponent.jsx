import { useAppContext } from "../context/AppContext";
import styles from "../styles/BoardComponent.module.css";
import CardComponent from "./CardComponent";

export default function BoardComponent() {
  const { deck } = useAppContext();
  const totalCards = deck.length;
  const columns = Math.ceil(Math.sqrt(totalCards));
  const rows = Math.ceil(totalCards / columns);

  // console.log(deck);

  return (
    <section
      className={styles.board}
      style={{
        gridTemplateColumns: `repeat(${columns}, min-content)`,
        gridTemplateRows: `repeat(${rows}, min-content)`,
      }}
    >
      {deck.map((card) => (
        <CardComponent key={card.id} card={card} rows={rows} />
      ))}
    </section>
  );
}

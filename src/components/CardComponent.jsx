import styles from "../styles/CardComponent.module.css";
import { useAppContext } from "../context/AppContext";

export default function CardComponent({ card, rows }) {
  const {
    flippedCards,
    setFlippedCards,
    matchedPairs,
    isDeckLocked,
    setMoves,
    isGameStarted,
  } = useAppContext();

  // dynamic card height calculation
  const boardHeight = 80; //85vh
  const boardPadding = 4; //2vh top and bottom
  const rowGap = (rows - 1) * 0.5; //.5vh gaps between rows
  const availableHeight = boardHeight - boardPadding - rowGap;
  const cardHeight = availableHeight / rows;
  const cardWidth = cardHeight * (2 / 3); //2:3 aspect ratio

  const handleClick = () => {
    if (!isGameStarted) {
      window.alert('Please click "Start Game" to begin playing!');
      return;
    }
    if (!isDeckLocked && flippedCards.length < 2 && !card.matched) {
      setFlippedCards([...flippedCards, card]);
      setMoves((prevMoves) => prevMoves + 1);
    }
  };

  const isFlipped =
    flippedCards.some((flippedCard) => flippedCard.id === card.id) ||
    matchedPairs.includes(card.id);

  return (
    <div
      className={styles.cardContainer}
      onClick={handleClick}
      style={{ height: `${cardHeight}vh`, width: `${cardWidth}vh` }}
    >
      {/* <img className={styles.cardImage} src={card.img} alt="" /> */}
      <div className={`${styles.cardInner} ${isFlipped ? styles.flipped : ""}`}>
        <img src={card.img} className={styles.faceVisible} />
        <img src={card.back} className={styles.backVisible} />
      </div>
      {/* <img
        className={styles.cardImage}
        src={isFlipped ? card.img : card.back}
        alt=""
        onClick={handleClick}
      /> */}
    </div>
  );
}

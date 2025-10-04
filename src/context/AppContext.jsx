import { createContext, useEffect, useState, useContext } from "react";
import { faceCards, backCards } from "../utils/cardImagesArray";
import { shuffle } from "../utils/shuffle";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // declare Game states
  const [deck, setDeck] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]); //temporary array, max 2cards
  const [matchedPairs, setMatchedPairs] = useState([]); //permanent array
  const [isDeckLocked, setIsDeckLocked] = useState(true);
  const [backColor, setBackColor] = useState(backCards[3]); //default first color in the array
  const [gridSize, setGridSize] = useState(4); //default 4x4 grid
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [moves, setMoves] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  // const [hallOfFame, setHallOfFame] = useState([]);

  const startGame = () => {
    setIsGameStarted(true);
    setIsGameCompleted(false);
    setStartTime(Date.now());
    setCurrentTime(0);
    setMoves(0);
    setFlippedCards([]);
    setMatchedPairs([]);
    setIsDeckLocked(false);
  };

  const endGame = () => {
    if (
      window.confirm(
        "Are you sure you want to end the game? All progress will be lost."
      )
    ) {
      setIsGameStarted(false);
      setIsGameCompleted(false);
      setStartTime(null);
      setEndTime(Date.now());
      setCurrentTime(0);
      setMoves(0);
      setFlippedCards([]);
      setMatchedPairs([]);
      setIsDeckLocked(true);
    }
  };

  const resetGame = () => {
    setIsGameStarted(false);
    setIsGameCompleted(false);
    setStartTime(null);
    setEndTime(null);
    setCurrentTime(0);
    setMoves(0);
    setFlippedCards([]);
    setMatchedPairs([]);
    setIsDeckLocked(true);
  };

  // load from LocaStorage on mount
  useEffect(() => {
    const savedItem = localStorage.getItem("memoryGameHallOfFame");
    if (savedItem) {
      setHallOfFame(JSON.parse(savedItem));
    }
  }, []);

  // timer logic
  useEffect(() => {
    let interval;

    if (isGameStarted && !isGameCompleted && startTime !== null) {
      interval = setInterval(() => {
        setCurrentTime(Date.now() - startTime);
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isGameStarted, startTime, isGameCompleted]);

  // Initialize deck on mount
  useEffect(() => {
    const shuffledImages = shuffle(faceCards); //shuffles card image array
    const cardCount = (gridSize * gridSize) / 2; //number of unique cards
    const selectedCards = shuffledImages.slice(0, cardCount);
    const deck = [];

    selectedCards.forEach((img, index) => {
      // create first pair of the same card with a & b id suffix
      // appends [id, img, back, matched]
      deck.push({ id: `$${index}-a`, img, back: backColor, matched: false });
      deck.push({ id: `$${index}-b`, img, back: backColor, matched: false });
    });

    //  Shuffles the selected deck again
    setDeck(shuffle(deck));

    // recreates deck whenever size or color changes
  }, [gridSize, backColor]);

  // checks for matched pair when flippedCards changes
  useEffect(() => {
    if (flippedCards.length === 2) {
      // locks board
      setIsDeckLocked(true);
      const [first, second] = flippedCards;
      if (first.img === second.img) {
        setMatchedPairs((prevMatchedPairs) => [
          ...prevMatchedPairs,
          first.id,
          second.id,
        ]);
        setTimeout(() => setFlippedCards([]), 500);
      } else {
        // flips card back after delay when not matched
        setTimeout(() => setFlippedCards([]), 1000);
      }
      // unlocks board after timeout
      setTimeout(() => setIsDeckLocked(false), 1000);
    }
  }, [flippedCards]);

  // Game completion
  useEffect(() => {
    if (
      matchedPairs.length === deck.length &&
      deck.length > 0 &&
      !isGameCompleted &&
      isGameStarted
    ) {
      console.log("Game completed!");
      setIsGameCompleted(true);
      setEndTime(Date.now());
    }
  }, [matchedPairs.length, deck.length, isGameCompleted, isGameStarted]);

  // Provide state and setters to children
  return (
    <AppContext.Provider
      value={{
        deck,
        flippedCards,
        setFlippedCards,
        matchedPairs,
        isDeckLocked,
        gridSize,
        setGridSize,
        backColor,
        setBackColor,
        isGameStarted,
        setIsGameStarted,
        isGameCompleted,
        setIsGameCompleted,
        startTime,
        endTime,
        moves,
        setMoves,
        currentTime,
        startGame,
        endGame,
        resetGame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

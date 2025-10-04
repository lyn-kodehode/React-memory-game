/*
  Memory Game Plan

  STATES
  ------
  deck: Array of all cards with { unique id, img, 'matched' property }
  flippedCards: Temporary Array of 1 or 2 cards currently flipped (max 2 cards)
  matchedPairs: Permanent Array of all cards that have been matched

  WORKFLOW
  ------
  1. Prepare deck
     - Pick N unique card images from cardImages
     - Duplicate each card to make pairs.
     - Assign a unique ID to each card (for React keys and tracking).
     - Shuffle the deck so the cards are in random order.
     - Set state: setDeck(deck)

  2. Render board
     - Map over deck and render CardComponent
     - Each card starts face down
     - The board displays all cards (16 cards if 8 unique pairs, etc.).
     
  3. Player clicks a card
     - Flip the card visually
     - Store this card in a temporary state (flippedCards).
     - Check: is this the first card of a turn or the second card?

  4. If it’s the second card
     - Compare the two flipped cards.
     - If they match, mark them as matched (permanent state).
     - If they don’t match, flip them back after a short delay.

  5. Update game state
     - Keep track of which cards are flipped (flippedCards).
     - Keep track of which pairs are matched (matchedPairs).
     - Check for game completion (all pairs matched).
  
  6. Optional extras
     - Track score or number of moves.
     - Timer for the game.
     Save progress to localStorage.
*/

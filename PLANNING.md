# Memory Game Workflow

## React States

- **deck**: all cards with `{ id, img, matched }`
- **flippedCards**: current 1 or 2 flipped cards
- **matchedPairs**: cards that have been matched

## Deck preparation

- Pick N unique cards
- Duplicate each card
- Assign unique IDs
- Shuffle

## Board rendering

- Cards face down
- Render all cards

## Card click

- Flip card
- Add to flippedCards
- Check first/second

## Match checking

- If match → add to matchedPairs
- If no match → flip back

## Game state

- deck: full cards
- flippedCards: current turn
- matchedPairs: found pairs

## Extras

- Score
- Timer
- Save progress

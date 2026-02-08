// Application-wide constants for flashcard modes and response types
// Used across FlashcardsPage and StatisticsPage to maintain consistent state

export const MODES = {
  INITIAL: 'initial',      // First pass through the full deck
  REVIEW: 'review',        // Reviewing only incorrect cards
  DECK_COMPLETE: 'deckComplete' // Finished current round
}

export const RESPONSE_TYPES = {
  RIGHT: 'right',
  WRONG: 'wrong'
}

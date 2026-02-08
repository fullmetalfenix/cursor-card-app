/**
 * FlashcardsPage - Main flashcard interface
 * 
 * Functionality:
 * - Displays one flashcard at a time from current deck
 * - Shows progress bar and card counter
 * - Handles navigation between cards
 * - Manages three modes: initial deck, review incorrect, and deck complete
 * 
 * State Management:
 * - Uses FlashcardContext for all state (no local state needed)
 * - Context provides: deck, mode, responses, navigation functions
 * 
 * Modes:
 * - INITIAL: First pass through shuffled full deck
 * - REVIEW: Only incorrect cards, reshuffled
 * - DECK_COMPLETE: Shows completion screen with review option
 * 
 * Related Components:
 * - Flashcard: Renders individual card UI
 * - FlashcardContext: Provides state and actions
 * - StatisticsPage: Displays stats from same context
 */

import { Typography, Box, Button, LinearProgress } from '@mui/material'
import Flashcard from '../components/Flashcard'
import { useFlashcards } from '../FlashcardContext'
import { MODES } from '../constants'

function FlashcardsPage() {
  // Get all state and actions from context - no local state needed
  const {
    deck,
    mode,
    currentIndex,
    stats,
    lastCompletedCount,
    markRight,
    markWrong,
    startReview,
    backToDeck,
    goToPrevious,
    goToNext
  } = useFlashcards()

  const current = deck[currentIndex]
  const totalInDeck = deck.length
  const completedInDeck = currentIndex >= totalInDeck ? totalInDeck : currentIndex

  // Deck complete screen - shows after finishing initial or review round
  if (mode === MODES.DECK_COMPLETE) {
    return (
      <Box sx={{ py: 3, px: 2, maxWidth: 420, mx: 'auto', textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          {lastCompletedCount < deck.length ? 'Review complete!' : 'Deck complete!'}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          You have answered all {lastCompletedCount} card{lastCompletedCount !== 1 ? 's' : ''} in this round.
        </Typography>
        
        {/* Show review button only if there are incorrect cards */}
        {stats.incorrectCount > 0 && (
          <Button variant="contained" onClick={startReview} sx={{ mb: 2 }}>
            Review incorrect cards ({stats.incorrectCount})
          </Button>
        )}
        
        <Box>
          <Button variant="outlined" onClick={backToDeck}>
            Back to deck
          </Button>
        </Box>
      </Box>
    )
  }

  // Empty state - shouldn't happen with valid flashcards.json
  if (!current) {
    return (
      <Typography color="text.secondary">No flashcards loaded.</Typography>
    )
  }

  // Main flashcard view - shows current card with progress and navigation
  return (
    <Box sx={{ py: 3, px: 2 }}>
      {/* Progress indicator - shows position in current deck */}
      <Box sx={{ maxWidth: 420, mx: 'auto', mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Card {currentIndex + 1} of {totalInDeck}
          {mode === MODES.REVIEW && ' (review)'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Completed: {completedInDeck} of {totalInDeck}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={totalInDeck ? (completedInDeck / totalInDeck) * 100 : 0}
          sx={{ mt: 1, height: 8, borderRadius: 1 }}
        />
      </Box>
      
      {/* Current flashcard - key prop forces re-render on card change */}
      <Flashcard
        key={current.term}
        term={current.term}
        definition={current.definition}
        onMarkRight={() => markRight(current.term)}
        onMarkWrong={() => markWrong(current.term)}
      />
      
      {/* Navigation buttons - disabled at deck boundaries */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2,
          maxWidth: 420,
          mx: 'auto',
        }}
      >
        <Button
          size="small"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
        >
          Previous
        </Button>
        <Button
          size="small"
          onClick={goToNext}
          disabled={currentIndex === totalInDeck - 1}
        >
          Next
        </Button>
      </Box>
    </Box>
  )
}

export default FlashcardsPage

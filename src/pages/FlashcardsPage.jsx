import { useState, useMemo, useCallback } from 'react'
import {
  Typography,
  Box,
  Button,
  LinearProgress,
} from '@mui/material'
import Flashcard from '../components/Flashcard'
import flashcardsData from '../../flashcards.json'

/** Fisher–Yates shuffle. Returns a new array. */
function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function FlashcardsPage() {
  const [responses, setResponses] = useState({}) // term -> 'right' | 'wrong'
  const [mode, setMode] = useState('initial') // 'initial' | 'review' | 'deckComplete'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [reviewDeck, setReviewDeck] = useState(null) // fixed shuffled list for current review round
  const [lastCompletedCount, setLastCompletedCount] = useState(0)

  const initialDeck = useMemo(() => shuffle(flashcardsData), [])

  const deck = mode === 'review' ? (reviewDeck || []) : initialDeck

  const current = deck[currentIndex]
  const totalInDeck = deck.length
  const completedInDeck = currentIndex >= totalInDeck ? totalInDeck : currentIndex

  const handleMarkRight = useCallback(() => {
    if (!current) return
    setResponses((prev) => ({ ...prev, [current.term]: 'right' }))
    if (currentIndex >= deck.length - 1) {
      setLastCompletedCount(deck.length)
      setMode('deckComplete')
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }, [current, currentIndex, deck.length])

  const handleMarkWrong = useCallback(() => {
    if (!current) return
    setResponses((prev) => ({ ...prev, [current.term]: 'wrong' }))
    if (currentIndex >= deck.length - 1) {
      setLastCompletedCount(deck.length)
      setMode('deckComplete')
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }, [current, currentIndex, deck.length])

  const startReview = useCallback(() => {
    const incorrect = flashcardsData.filter((c) => responses[c.term] === 'wrong')
    setReviewDeck(shuffle(incorrect))
    setMode('review')
    setCurrentIndex(0)
  }, [responses])

  const incorrectCount = flashcardsData.filter((c) => responses[c.term] === 'wrong').length

  if (mode === 'deckComplete') {
    return (
      <Box sx={{ py: 3, px: 2, maxWidth: 420, mx: 'auto', textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          {lastCompletedCount < flashcardsData.length ? 'Review complete!' : 'Deck complete!'}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          You have answered all {lastCompletedCount} card{lastCompletedCount !== 1 ? 's' : ''} in this round.
        </Typography>
        {incorrectCount > 0 && (
          <Button variant="contained" onClick={startReview} sx={{ mb: 2 }}>
            Review incorrect cards ({incorrectCount})
          </Button>
        )}
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              setMode('initial')
              setCurrentIndex(0)
              setReviewDeck(null)
            }}
          >
            Back to deck
          </Button>
        </Box>
      </Box>
    )
  }

  if (!current) {
    return (
      <Typography color="text.secondary">No flashcards loaded.</Typography>
    )
  }

  return (
    <Box sx={{ py: 3, px: 2 }}>
      <Box sx={{ maxWidth: 420, mx: 'auto', mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Card {currentIndex + 1} of {totalInDeck}
          {mode === 'review' && ' (review)'}
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
      <Flashcard
        key={current.term}
        term={current.term}
        definition={current.definition}
        onMarkRight={handleMarkRight}
        onMarkWrong={handleMarkWrong}
      />
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
          onClick={() => setCurrentIndex((i) => (i - 1 + totalInDeck) % totalInDeck)}
          disabled={currentIndex === 0}
        >
          Previous
        </Button>
        <Button
          size="small"
          onClick={() => setCurrentIndex((i) => (i + 1) % totalInDeck)}
          disabled={currentIndex === totalInDeck - 1}
        >
          Next
        </Button>
      </Box>
    </Box>
  )
}

export default FlashcardsPage

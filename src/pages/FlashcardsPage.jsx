import { useState } from 'react'
import { Typography, Box } from '@mui/material'
import Flashcard from '../components/Flashcard'
import flashcardsData from '../../flashcards.json'

function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const total = flashcardsData.length
  const current = flashcardsData[currentIndex]

  const goNext = () => {
    setCurrentIndex((i) => (i + 1) % total)
  }
  const goPrev = () => {
    setCurrentIndex((i) => (i - 1 + total) % total)
  }

  if (!current) {
    return (
      <Typography color="text.secondary">No flashcards loaded.</Typography>
    )
  }

  return (
    <Box sx={{ py: 3, px: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
        Card {currentIndex + 1} of {total}
      </Typography>
      <Flashcard term={current.term} definition={current.definition} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2,
          maxWidth: 420,
          mx: 'auto',
        }}
      >
        <Typography
          component="button"
          variant="body2"
          onClick={goPrev}
          sx={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: 'primary.main',
            textDecoration: 'underline',
          }}
        >
          Previous
        </Typography>
        <Typography
          component="button"
          variant="body2"
          onClick={goNext}
          sx={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: 'primary.main',
            textDecoration: 'underline',
          }}
        >
          Next
        </Typography>
      </Box>
    </Box>
  )
}

export default FlashcardsPage

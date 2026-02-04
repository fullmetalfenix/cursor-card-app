import { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Button,
  ButtonGroup,
  Box,
} from '@mui/material'

/**
 * Displays a single flashcard with term on front and definition on back.
 * Users can flip the card via the "Flip" button, then mark "Got it Right!" or "Got it Wrong."
 */
function Flashcard({ term, definition, onMarkRight, onMarkWrong }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 420,
        minHeight: 220,
        mx: 'auto',
        perspective: '1000px',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            minHeight: 160,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {!isFlipped ? (
            <Typography variant="h5" component="p" color="text.primary">
              {term}
            </Typography>
          ) : (
            <Typography variant="body1" color="text.secondary">
              {definition}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => setIsFlipped(!isFlipped)}
            aria-label={isFlipped ? 'Show term' : 'Reveal definition'}
          >
            {isFlipped ? 'Show term' : 'Flip'}
          </Button>
          {isFlipped && (
            <ButtonGroup variant="outlined" sx={{ mt: 1 }}>
              <Button
                color="success"
                onClick={() => {
                  onMarkRight?.()
                }}
              >
                Got it Right!
              </Button>
              <Button
                color="error"
                onClick={() => {
                  onMarkWrong?.()
                }}
              >
                Got it Wrong
              </Button>
            </ButtonGroup>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default Flashcard

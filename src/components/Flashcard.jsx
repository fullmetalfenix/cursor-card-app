/**
 * Flashcard - Presentational component for a single flashcard
 * 
 * Features:
 * - Displays term on front, definition on back
 * - Flip animation controlled by local state
 * - Right/Wrong buttons appear only when flipped
 * 
 * Props:
 * - term: The flashcard term (front side)
 * - definition: The explanation (back side)
 * - onMarkRight: Callback when user marks card correct
 * - onMarkWrong: Callback when user marks card incorrect
 * 
 * Used by: FlashcardsPage
 * State: Local flip state only (doesn't need global context)
 */

import { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Button,
  ButtonGroup,
  Box,
} from '@mui/material'

function Flashcard({ term, definition, onMarkRight, onMarkWrong }) {
  // Local state for flip animation - doesn't need to be in global context
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
        {/* Card content area - shows term or definition based on flip state */}
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
        
        {/* Control buttons - flip always visible, right/wrong only when flipped */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {isFlipped ? 'Show term' : 'Flip'}
          </Button>
          {isFlipped && (
            <ButtonGroup variant="outlined" sx={{ mt: 1 }}>
              <Button color="success" onClick={onMarkRight}>
                Got it Right!
              </Button>
              <Button color="error" onClick={onMarkWrong}>
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

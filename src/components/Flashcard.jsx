import { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material'

/**
 * Displays a single flashcard with term on front and definition on back.
 * Users can flip the card via the "Flip" button.
 */
function Flashcard({ term, definition }) {
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
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => setIsFlipped(!isFlipped)}
            aria-label={isFlipped ? 'Show term' : 'Reveal definition'}
          >
            {isFlipped ? 'Show term' : 'Flip'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Flashcard

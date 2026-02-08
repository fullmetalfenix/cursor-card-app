/**
 * StatisticsPage - Displays user progress and performance metrics
 * 
 * Functionality:
 * - Shows flashcard statistics (correct/incorrect counts and percentages)
 * - Displays overall completion progress
 * - Future: Will show quiz statistics when test mode is implemented
 * 
 * State Management:
 * - Uses FlashcardContext to access responses and calculate stats
 * - Stats are computed in real-time from context data
 * 
 * Related Components:
 * - FlashcardContext: Provides responses data
 * - FlashcardsPage: Where user responses are recorded
 * 
 * Data Flow:
 * 1. User marks cards right/wrong in FlashcardsPage
 * 2. Responses stored in FlashcardContext
 * 3. StatisticsPage reads responses and displays calculated stats
 */

import { Typography, Box, Paper, Grid } from '@mui/material'
import { useFlashcards } from '../FlashcardContext'

function StatisticsPage() {
  const { stats } = useFlashcards()

  return (
    <Box sx={{ py: 3, px: 2, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Statistics
      </Typography>
      
      {/* Flashcard Statistics Section */}
      <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Flashcard Progress
        </Typography>
        
        <Grid container spacing={2}>
          {/* Overall completion */}
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Overall Progress
              </Typography>
              <Typography variant="h4">
                {stats.completionPercentage}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {stats.answeredCards} of {stats.totalCards} cards answered
              </Typography>
            </Box>
          </Grid>
          
          {/* Accuracy */}
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Accuracy
              </Typography>
              <Typography variant="h4">
                {stats.correctPercentage}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {stats.correctCount} correct, {stats.incorrectCount} incorrect
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Quiz Statistics Section - Placeholder for future implementation */}
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Quiz Statistics
        </Typography>
        <Typography color="text.secondary">
          Complete all flashcards to unlock test mode.
        </Typography>
      </Paper>
    </Box>
  )
}

export default StatisticsPage

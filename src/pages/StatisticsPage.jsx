import { Typography, Box, Paper } from '@mui/material'

function StatisticsPage() {
  return (
    <Box sx={{ py: 3, px: 2 }}>
      <Typography variant="h6" gutterBottom>
        Statistics
      </Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography color="text.secondary">
          Flashcard and quiz statistics will appear here as you use the app.
        </Typography>
      </Paper>
    </Box>
  )
}

export default StatisticsPage

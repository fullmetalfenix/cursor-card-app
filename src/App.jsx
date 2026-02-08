/**
 * App - Root component of the flashcard application
 * 
 * Architecture:
 * - Wraps entire app with Material-UI theme and global styles
 * - Provides routing between Flashcards and Statistics pages
 * - Wraps pages with FlashcardProvider for shared state management
 * 
 * State Management:
 * - FlashcardContext provides global state to all child components
 * - Eliminates prop drilling and enables state sharing across routes
 * 
 * Routes:
 * - / : FlashcardsPage - Main flashcard interface
 * - /statistics : StatisticsPage - Progress tracking and stats
 */

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import { FlashcardProvider } from './FlashcardContext'
import FlashcardsPage from './pages/FlashcardsPage'
import StatisticsPage from './pages/StatisticsPage'

const theme = createTheme()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FlashcardProvider>
        <BrowserRouter>
          <Box sx={{ flexGrow: 1 }}>
            {/* Navigation bar - persistent across all routes */}
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
                  Flashcard App
                </Typography>
                <NavLink
                  to="/"
                  style={({ isActive }) => ({
                    color: 'white',
                    marginRight: 16,
                    textDecoration: isActive ? 'underline' : 'none',
                  })}
                >
                  Flashcards
                </NavLink>
                <NavLink
                  to="/statistics"
                  style={({ isActive }) => ({
                    color: 'white',
                    textDecoration: isActive ? 'underline' : 'none',
                  })}
                >
                  Statistics
                </NavLink>
              </Toolbar>
            </AppBar>
            <main>
              <Routes>
                <Route path="/" element={<FlashcardsPage />} />
                <Route path="/statistics" element={<StatisticsPage />} />
              </Routes>
            </main>
          </Box>
        </BrowserRouter>
      </FlashcardProvider>
    </ThemeProvider>
  )
}

export default App

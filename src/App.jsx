import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import FlashcardsPage from './pages/FlashcardsPage'
import StatisticsPage from './pages/StatisticsPage'

const theme = createTheme()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
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
    </ThemeProvider>
  )
}

export default App

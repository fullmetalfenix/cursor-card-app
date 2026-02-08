import { createContext, useContext, useState, useMemo, useCallback } from 'react'
import flashcardsData from '../flashcards.json'
import { MODES, RESPONSE_TYPES } from './constants'
import { shuffle, calculateStats } from './utils'

/**
 * FlashcardContext - Global state management for flashcard application
 * 
 * Manages:
 * - User responses (right/wrong for each card)
 * - Current mode (initial deck, review, or complete)
 * - Current card index and deck composition
 * 
 * Used by: FlashcardsPage, StatisticsPage
 * Provides: responses, statistics, mode controls, and navigation functions
 */
const FlashcardContext = createContext(null)

export function FlashcardProvider({ children }) {
  // Core state: tracks user's right/wrong responses by term
  const [responses, setResponses] = useState({})
  
  // Mode state: controls which deck is shown (initial/review/complete)
  const [mode, setMode] = useState(MODES.INITIAL)
  
  // Navigation state: current position in deck
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Review deck: shuffled subset of incorrect cards
  const [reviewDeck, setReviewDeck] = useState(null)
  
  // Tracks how many cards were in the last completed round
  const [lastCompletedCount, setLastCompletedCount] = useState(0)

  // Initial deck is shuffled once on mount and reused
  const initialDeck = useMemo(() => shuffle(flashcardsData), [])

  // Current active deck depends on mode
  const deck = mode === MODES.REVIEW ? (reviewDeck || []) : initialDeck

  // Statistics calculated from responses
  const stats = useMemo(() => calculateStats(responses, flashcardsData), [responses])

  /**
   * Marks current card as correct and advances to next card or completes deck
   */
  const markRight = useCallback((term) => {
    setResponses(prev => ({ ...prev, [term]: RESPONSE_TYPES.RIGHT }))
    if (currentIndex >= deck.length - 1) {
      setLastCompletedCount(deck.length)
      setMode(MODES.DECK_COMPLETE)
    } else {
      setCurrentIndex(i => i + 1)
    }
  }, [currentIndex, deck.length])

  /**
   * Marks current card as incorrect and advances to next card or completes deck
   */
  const markWrong = useCallback((term) => {
    setResponses(prev => ({ ...prev, [term]: RESPONSE_TYPES.WRONG }))
    if (currentIndex >= deck.length - 1) {
      setLastCompletedCount(deck.length)
      setMode(MODES.DECK_COMPLETE)
    } else {
      setCurrentIndex(i => i + 1)
    }
  }, [currentIndex, deck.length])

  /**
   * Starts review mode with shuffled incorrect cards
   */
  const startReview = useCallback(() => {
    const incorrect = flashcardsData.filter(c => responses[c.term] === RESPONSE_TYPES.WRONG)
    setReviewDeck(shuffle(incorrect))
    setMode(MODES.REVIEW)
    setCurrentIndex(0)
  }, [responses])

  /**
   * Resets to initial deck view
   */
  const backToDeck = useCallback(() => {
    setMode(MODES.INITIAL)
    setCurrentIndex(0)
    setReviewDeck(null)
  }, [])

  /**
   * Navigate to previous card in current deck
   */
  const goToPrevious = useCallback(() => {
    setCurrentIndex(i => Math.max(0, i - 1))
  }, [])

  /**
   * Navigate to next card in current deck
   */
  const goToNext = useCallback(() => {
    setCurrentIndex(i => Math.min(deck.length - 1, i + 1))
  }, [deck.length])

  const value = {
    // State
    responses,
    mode,
    currentIndex,
    deck,
    stats,
    lastCompletedCount,
    
    // Actions
    markRight,
    markWrong,
    startReview,
    backToDeck,
    goToPrevious,
    goToNext
  }

  return (
    <FlashcardContext.Provider value={value}>
      {children}
    </FlashcardContext.Provider>
  )
}

/**
 * Hook to access flashcard context
 * Must be used within FlashcardProvider
 */
export function useFlashcards() {
  const context = useContext(FlashcardContext)
  if (!context) {
    throw new Error('useFlashcards must be used within FlashcardProvider')
  }
  return context
}

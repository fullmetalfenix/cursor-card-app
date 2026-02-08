/**
 * Utility functions for flashcard operations
 * Used by FlashcardsPage and StatisticsPage
 */

import { RESPONSE_TYPES } from './constants'

/**
 * Fisher-Yates shuffle algorithm - randomizes array order
 * Creates a new array to avoid mutating the original
 * @param {Array} array - Array to shuffle
 * @returns {Array} New shuffled array
 */
export function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Calculates statistics from user responses
 * @param {Object} responses - Map of term -> 'right'|'wrong'
 * @param {Array} allCards - Full flashcard dataset
 * @returns {Object} Statistics object with counts and percentages
 */
export function calculateStats(responses, allCards) {
  const totalCards = allCards.length
  const answeredCards = Object.keys(responses).length
  const correctCount = Object.values(responses).filter(r => r === RESPONSE_TYPES.RIGHT).length
  const incorrectCount = Object.values(responses).filter(r => r === RESPONSE_TYPES.WRONG).length
  
  return {
    totalCards,
    answeredCards,
    correctCount,
    incorrectCount,
    correctPercentage: answeredCards > 0 ? Math.round((correctCount / answeredCards) * 100) : 0,
    completionPercentage: Math.round((answeredCards / totalCards) * 100)
  }
}

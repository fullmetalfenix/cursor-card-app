# Flashcard App - Architecture Documentation

## Overview
A React-based flashcard application for learning LLM development terms. Built with Vite, React Router, Material-UI, and Context API for state management.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Flashcard.jsx   # Individual flashcard display
├── pages/              # Route-level components
│   ├── FlashcardsPage.jsx  # Main flashcard interface
│   └── StatisticsPage.jsx  # Progress tracking
├── App.jsx             # Root component with routing
├── FlashcardContext.jsx # Global state management
├── constants.js        # Application constants
├── utils.js            # Utility functions
└── main.jsx            # Application entry point
```

## Architecture Patterns

### State Management
**Context API Pattern** - Centralized state management without prop drilling

- **FlashcardContext** provides global state to all components
- Eliminates need to pass props through multiple component levels
- Single source of truth for user responses and application mode

### Component Hierarchy

```
App (provides theme, routing, context)
├── FlashcardProvider (global state)
│   ├── FlashcardsPage (consumes context)
│   │   └── Flashcard (presentational, receives props)
│   └── StatisticsPage (consumes context)
```

## Core Components

### App.jsx
**Purpose**: Root component and application shell

**Responsibilities**:
- Wraps app with Material-UI theme
- Provides routing between pages
- Wraps pages with FlashcardProvider for state access
- Renders persistent navigation bar

**Key Dependencies**: 
- FlashcardContext (provides to children)
- React Router (routing)
- Material-UI (theming)

---

### FlashcardContext.jsx
**Purpose**: Global state management for flashcard data and user progress

**State Managed**:
- `responses` - Map of term → 'right'|'wrong'
- `mode` - Current app mode (initial/review/complete)
- `currentIndex` - Position in current deck
- `reviewDeck` - Shuffled subset of incorrect cards
- `deck` - Current active deck (initial or review)

**Actions Provided**:
- `markRight(term)` - Mark card correct, advance or complete
- `markWrong(term)` - Mark card incorrect, advance or complete
- `startReview()` - Begin review mode with incorrect cards
- `backToDeck()` - Return to initial deck view
- `goToPrevious()` / `goToNext()` - Navigate between cards

**Computed Values**:
- `stats` - Real-time statistics from responses
- `deck` - Active deck based on current mode

**Usage Pattern**:
```javascript
const { responses, markRight, stats } = useFlashcards()
```

---

### FlashcardsPage.jsx
**Purpose**: Main flashcard interface with navigation and progress tracking

**Features**:
- Displays one card at a time
- Shows progress bar and card counter
- Handles three modes: initial, review, complete
- Provides Previous/Next navigation

**State**: None (all state from context)

**Data Flow**:
1. Gets current deck and index from context
2. Renders current card with Flashcard component
3. User marks right/wrong → calls context actions
4. Context updates responses and advances index
5. Component re-renders with new card

**Mode Behavior**:
- **INITIAL**: Shows shuffled full deck
- **REVIEW**: Shows shuffled incorrect cards only
- **DECK_COMPLETE**: Shows completion screen with review option

---

### Flashcard.jsx
**Purpose**: Presentational component for individual flashcard

**Features**:
- Flip animation (term ↔ definition)
- Right/Wrong buttons (only when flipped)
- Self-contained flip state

**Props**:
- `term` - Front of card
- `definition` - Back of card
- `onMarkRight` - Callback for correct answer
- `onMarkWrong` - Callback for incorrect answer

**State**: Local flip state only (doesn't need global context)

**Design Decision**: Keeps flip state local because it's UI-only and doesn't affect application logic

---

### StatisticsPage.jsx
**Purpose**: Display user progress and performance metrics

**Features**:
- Overall completion percentage
- Accuracy percentage
- Correct/incorrect counts
- Placeholder for future quiz statistics

**State**: None (reads from context)

**Data Flow**:
1. Gets stats from context
2. Stats are computed from responses in real-time
3. Displays formatted statistics

---

## Utility Modules

### constants.js
**Purpose**: Centralize magic strings and values

**Exports**:
- `MODES` - Application modes (INITIAL, REVIEW, DECK_COMPLETE)
- `RESPONSE_TYPES` - User response types (RIGHT, WRONG)

**Benefits**: 
- Prevents typos
- Single source of truth
- Easy refactoring

---

### utils.js
**Purpose**: Reusable utility functions

**Functions**:

#### `shuffle(array)`
- Fisher-Yates shuffle algorithm
- Returns new array (doesn't mutate)
- Used for randomizing deck order

#### `calculateStats(responses, allCards)`
- Computes statistics from responses
- Returns: totalCards, answeredCards, correctCount, incorrectCount, percentages
- Used by context to provide real-time stats

---

## Data Flow

### User Marks Card Right/Wrong
```
1. User clicks "Got it Right!" in Flashcard component
2. Flashcard calls onMarkRight prop
3. FlashcardsPage calls markRight(term) from context
4. Context updates responses state
5. Context checks if deck is complete
6. If complete: sets mode to DECK_COMPLETE
7. If not: increments currentIndex
8. All components consuming context re-render
9. StatisticsPage shows updated stats
```

### Starting Review Mode
```
1. User clicks "Review incorrect cards" button
2. FlashcardsPage calls startReview() from context
3. Context filters flashcards for incorrect responses
4. Context shuffles incorrect cards
5. Context sets reviewDeck and mode to REVIEW
6. Context resets currentIndex to 0
7. FlashcardsPage re-renders with review deck
```

## Key Design Decisions

### Why Context API?
- **Pro**: Simple, built-in, no external dependencies
- **Pro**: Perfect for this app's moderate state complexity
- **Pro**: Eliminates prop drilling through router
- **Con**: All consumers re-render on any state change (acceptable for this scale)

### Why Shuffle on Mount?
- Initial deck shuffled once with `useMemo(() => shuffle(data), [])`
- Ensures consistent order during session
- Review deck shuffled each time to provide variety

### Why Local Flip State?
- Flip animation is UI-only concern
- Doesn't affect application logic or other components
- Keeps Flashcard component self-contained and reusable

### Why Separate Pages?
- Clear separation of concerns
- Easy to add new pages (e.g., test mode)
- Aligns with React Router best practices

## Future Enhancements

### Test Mode (Planned)
- New page: TestPage.jsx
- Unlocked when all cards marked correct
- Fill-in-the-blank questions
- Will use same FlashcardContext for state

**Integration Points**:
- Add test mode to MODES constant
- Add quiz responses to context state
- Update StatisticsPage to show quiz stats
- Add route in App.jsx

### Persistence (Potential)
- Add localStorage to FlashcardContext
- Save/load responses on mount/unmount
- Maintain progress across sessions

### Content Management (Potential)
- Add CRUD operations for flashcards
- Store in backend instead of JSON file
- User authentication for multi-user support

## Testing Strategy

### Unit Tests
- Utility functions (shuffle, calculateStats)
- Context actions (markRight, markWrong)
- Component rendering

### Integration Tests
- User flow: flip card → mark right → advance
- Review mode: complete deck → start review
- Statistics: responses → calculated stats

### E2E Tests (Playwright)
- Full user journey through deck
- Review incorrect cards flow
- Navigation between pages

## Performance Considerations

### Optimizations Applied
- `useMemo` for initial deck shuffle (prevents re-shuffle on re-render)
- `useCallback` for context actions (stable references)
- Key prop on Flashcard (forces re-render on card change, resets flip state)

### Potential Bottlenecks
- Context re-renders all consumers on any state change
  - **Mitigation**: Split context if state grows significantly
- Statistics recalculated on every render
  - **Current**: Acceptable with 10 cards
  - **Future**: Memoize if card count increases significantly

## Development Guidelines

### Adding New Features
1. Determine if state is local or global
2. If global, add to FlashcardContext
3. If new page, add route in App.jsx
4. Update constants.js for new modes/types
5. Add utility functions to utils.js if reusable

### Modifying State
1. Always use context actions, never mutate state directly
2. Add new actions to FlashcardContext
3. Export via useFlashcards hook
4. Document in this file

### Component Guidelines
- Keep components focused on single responsibility
- Use context for cross-component state
- Use local state for UI-only concerns
- Add comprehensive comments for complex logic

## Common Tasks

### Add New Flashcard
Edit `flashcards.json`:
```json
{
  "term": "New Term",
  "definition": "Simple explanation of the term."
}
```

### Add New Mode
1. Add to `constants.js`: `MODES.NEW_MODE = 'newMode'`
2. Add mode handling in FlashcardContext
3. Add UI for mode in FlashcardsPage

### Add New Statistic
1. Update `calculateStats()` in utils.js
2. Access via `stats` from useFlashcards hook
3. Display in StatisticsPage

## Troubleshooting

### Context Not Available Error
**Error**: "useFlashcards must be used within FlashcardProvider"
**Cause**: Component using useFlashcards is outside FlashcardProvider
**Fix**: Ensure component is child of FlashcardProvider in App.jsx

### Cards Not Shuffling
**Cause**: useMemo dependency array includes changing value
**Fix**: Keep dependency array empty `[]` for one-time shuffle

### Stats Not Updating
**Cause**: Context state not updating properly
**Fix**: Ensure using context actions (markRight/markWrong), not direct state mutation

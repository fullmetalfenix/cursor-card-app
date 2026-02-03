# Flashcard App for Learning LLM Terms - Software Specification

## 1. **Overview**
The flashcard app is a proof-of-concept web application designed for users to learn terms commonly used in large language model (LLM) development. The application is built using JavaScript with React and Vite for a modern development and build experience. The app will follow Material Design specifications, ensuring a modern, intuitive, and user-friendly UI/UX. User data will be stored only in memory without persistence across sessions, and the app will not require authentication.

The core functionalities of the app include flashcards for learning terms, tracking correct and incorrect answers, a test mode with fill-in-the-blank questions, and a statistics tab to track user progress. Initially, the app will include 10 hardcoded flashcards, and the application will be deployed for local use as a proof of concept.

---

## 2. **Features**

### 2.1 Flashcard Learning Mode
- **Structure**:
  - Each card contains a term on the front and a simplified, easy-to-understand definition and explanation of the term on the back.
  - Users can flip the card to view the definition.
- **User Interaction**:
  - Each card will display two buttons below the definition: 
    - **"Got it Right!"**
    - **"Got it Wrong"**
  - Users will mark cards as "Right" or "Wrong" after reviewing the definition.
- **Data Handling**:
  - The system will keep an in-memory record of which cards were marked as "Right" or "Wrong."
  - Once a user completes the deck, the statistics will update to display the user's performance.

### 2.2 Revisiting Incorrect Cards
- After completing the deck once, users will have an option to view only the cards flagged as "Got it Wrong."
- The user can go through shuffled incorrect cards and reattempt them, marking them as "Right" once they feel confident.
- The "state" of each card can change from "wrong" to "right" upon being marked correctly. This affects the statistics.

### 2.3 Test Mode
- After users complete all flashcards with 100% correctness (all cards marked as "Right"), a new **Test Mode** will be unlocked.
- **Test Mode Functionality**:
  - Consists of 5 randomly selected "fill-in-the-blank" questions based on the terms from the deck.
  - Each question will display a sentence with the term missing (e.g., "A **[blank]** is a mathematical model for a conversation system.") and provide a text input for the user to type the answer (term).
- Answers will be checked for exact match to the term in the corresponding card.
- Feedback will be provided after the quiz with correct/incorrect results.

### 2.4 Statistics Tab
- A dedicated **Statistics Tab** will display summary statistics of the user's progress:
  - Flashcards:
    - Total number of flashcards reviewed.
    - Number of cards marked as "Got it Right!" and "Got it Wrong."
  - Quiz:
    - Quiz performance summary (e.g., number of correct answers out of 5 and percentage).
    - Will only display after the quiz is unlocked.

### 2.5 Hardcoded Flashcards
- **Initial Deck**:
  - The application will include a JSON file (`flashcards.json`) containing 10 terms and their simplified definitions.
  - Example entries:
    ```json
    [
      { 
        "term": "Tokenization", 
        "definition": "Breaking down text into smaller parts, like words or characters, to help a computer understand the language." 
      },
      { 
        "term": "Embeddings", 
        "definition": "Converting words or sentences into numbers (vectors) so computers can process them and find patterns." 
      }
    ]
    ```

---

## 3. **User Interface (UI/UX)**
The app will use Google's **Material Design** specifications for consistency and modern visuals.
- Use React Material-UI (MUI) for prebuilt components and ensure a responsive design.
- **Main screen**:
  - Header with navigation links: Flashcards, Test Mode (locked initially), Statistics.
  - Flashcard area will display cards one at a time.
      - Each card displays the term and shows the definition upon flipping.
      - Two buttons below the definition to mark feedback: "Got it Right!" and "Got it Wrong."
- **Test Mode**:
  - Contains a form with five "fill-in-the-blank" questions, each in its own card.
  - Include a "Submit Quiz" button to calculate the user's score.
- **Statistics Tab**:
  - Display Flashcard statistics (correct/incorrect counts and percentages).
  - Separate section for Quiz Performance (unlocked after completing Flashcards).

---

## 4. **Technical Specifications**

### 4.1 Development Stack
- **Language**: JavaScript (with ES6+ syntax).
- **Framework**: React.
- **Module Bundler**: Vite.
- **UI Framework**: MUI (Material-UI).
- **Data Storage**: Flashcards and initial data stored in a hardcoded JSON file (`flashcards.json`). User progress maintained in memory (no persistence).

### 4.2 Dependencies
- React library + React Hooks for state management.
- react-router-dom for routing between the Flashcards, Test Mode, and Statistics tabs.
- MUI framework for UI components and Material Design styling.
- Any appropriate linting tools such as ESLint + Prettier.

---

## 5. Deployment
This app is intended as a proof of concept and will only be run locally during the development phase. In future phases, the following free-tier cloud-based solutions are recommended for deployment:
- **Netlify**: Free plan includes continuous deployment from GitHub, custom domains, and HTTPS support.
- **Vercel**: Free tier supports seamless deployment of React applications with integrated CI/CD and custom domains.
- **GitHub Pages**: Free static site hosting that can serve the built Vite app if the app usage does not require a backend.
- **Render**: Free plan for static sites and includes support for custom domains and HTTPS.

Deployment instructions for local testing:
1. Clone the repository to your local machine.
2. Run `npm install` or `yarn` to install dependencies.
3. Use `npm run dev` or `yarn dev` to start the development server.
4. Access the app locally at `http://localhost:5173`.

---

## 6. Future Enhancements
This proof-of-concept app is designed to be a starting point for a more feature-rich flashcard and learning platform. Possible future enhancements include:
- Adding user authentication and persistence of data via a backend database.
- Allowing users to create, edit, and remove their own flashcards.
- Implementing multiple choice questions and support for images or multimedia in flashcards.
- Deploying the app on a cloud platform for production use.

--- 

## 7. JSON Data File Structure
The initial set of flashcards will be stored in a JSON file named `flashcards.json` in a flat array of term-definition pairs:
```json
[
  { 
    "term": "Tokenization", 
    "definition": "Breaking down text into smaller parts, like words or characters, to help a computer understand the language." 
  },
  { 
    "term": "Embedding", 
    "definition": "Converting words or sentences into numbers (vectors) so a computer can process them to find patterns and relationships." 
  },
  ...
]
```
The file is static and included in the project's source code.

---

## 8. Development Workflow
1. Start by setting up the Vite + React project.
2. Install Material-UI and configure the app for Material Design.
3. Create reusable React components:
   - `Flashcard`
   - `Quiz`
   - `Statistics`
4. Prepare and load the JSON file with the 10 initial terms for LLM learning concepts.
5. Implement the Flashcard functionality:
   - Flip animation/interaction for cards to reveal answers.
   - "Got it Right!" and "Got it Wrong" buttons.
   - Feedback and progress tracking in-memory.
6. Implement the ability to review "incorrect" flashcards, with shuffled order.
7. Create the Test Mode with 5 randomized fill-in-the-blank questions.
8. Add the Statistics tab, dynamically showing Flashcard and Quiz statistics.
9. Test the app thoroughly in a local environment.
10. Prepare the application for deployment using local build tools (e.g., Vite's `build` command).

--- 

## 9. Example Use Scanario
- User opens the flashcard app, selects the first card, and flips it to see the definition.
- User selects “Got it Right!” or “Got it Wrong” depending on their understanding.
- Once all flashcards are marked, user sees an option to re-review missed cards (shuffled) and continues until all are marked "Got it Right."
- When all cards are completed, the Test Mode unlocks. The user answers five fill-in-the-blank questions and checks their score.
- User navigates to the **Statistics Tab** to view their performance on both Flashcards and Test Mode.

--- 
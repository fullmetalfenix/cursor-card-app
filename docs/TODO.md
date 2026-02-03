# Flashcard App Implementation TODO List

This TODO list outlines the features to be implemented for the flashcard app. Features are divided into phases: from easy to hard. Each item includes specific acceptance criteria to ensure proper implementation and testing.

---

## **Phase 1: Project Setup and Basic Flashcard Functionality**
### Goal: Set up the project and enable users to view and interact with flashcards.

- [x] **Set up Vite and React project**
  - **Acceptance Criteria**:
    - A new Vite project is created using the React template.
    - The project starts successfully using `npm run dev` or `yarn dev`.

- [x] **Install and configure Material-UI**
  - **Acceptance Criteria**:
    - React Material-UI (MUI) is installed and the default theme is applied.
    - The app renders a simple MUI button or input as proof of proper styling configuration.

- [x] **Create a JSON file for flashcards**
  - **Acceptance Criteria**:
    - Create a file `flashcards.json` in the project directory.
    - The file contains a hardcoded array of 10 terms and definitions, as described in the specification.
    - The JSON file is successfully imported and its data can be accessed within a React component.

- [x] **Implement a Flashcard display component**
  - **Acceptance Criteria**:
    - A `Flashcard` component displays a term on the front side, and its definition when flipped.
    - Users can flip the card to reveal the definition by clicking the "Flip" button.
    - The design adheres to Material Design principles.

- [x] **Implement navigation system**
  - **Acceptance Criteria**:
    - The app has a basic navigation bar using React Router.
    - Tabs for "Flashcards" and "Statistics" are present.

---

## **Phase 2: User Feedback Mechanics**
### Goal: Allow users to interact with the flashcards and provide feedback.

- [ ] **Add "Got it Right!" and "Got it Wrong" buttons**
  - **Acceptance Criteria**:
    - Each flashcard has two buttons: "Got it Right!" and "Got it Wrong."
    - When clicked, a correct or incorrect status is saved for the current card in memory.

- [ ] **Keep track of flashcard progress**
  - **Acceptance Criteria**:
    - The app displays a progress indicator showing how many cards the user has completed.
    - The app updates the progress indicator in real-time as the user interacts with the "Got it Right!" / "Got it Wrong" buttons.

- [ ] **Shuffling functionality**
  - **Acceptance Criteria**:
    - Cards display in shuffled order every time the user starts a new session or revisits incorrect cards.

- [ ] **Review incorrect answers**
  - **Acceptance Criteria**:
    - After completing the initial deck, users can review their incorrect answers in a shuffled order.
    - Users can mark these previously incorrect answers as "Got it Right!" to update their progress.

---

## **Phase 3: Test Mode**
### Goal: Unlock and implement the test mode after 100% flashcard completion.

- [ ] **Unlock Test Mode**
  - **Acceptance Criteria**:
    - The Test Mode tab unlocks only after all flashcards are marked as "Got it Right!"
    - A new tab called "Test Mode" appears on the navigation bar once unlocked.
    - Users can navigate to the Test Mode page.

- [ ] **Implement Fill-in-the-Blank Test**
  - **Acceptance Criteria**:
    - Test Mode generates 5 random fill-in-the-blank questions from the flashcards.
    - Each question displays a sentence with a term missing (e.g., "A **[blank]** is a mathematical model for a conversation system.") and provides a text input for the user to type in the answer.
    - The app checks the answer and provides immediate feedback (correct/incorrect).
    - Users can see their final score (correct answers out of 5) after completing the test.

---

## **Phase 4: Statistics Tab**
### Goal: Provide users with statistics about their progress.

- [ ] **Create a Statistics Tab with Flashcard Performance**
  - **Acceptance Criteria**:
    - A new statistics page is accessible from the navigation bar.
    - Displays the total number of flashcards reviewed and the number of cards marked as "Got it Right!" and "Got it Wrong."
    - Updates dynamically as the user marks cards.

- [ ] **Display Quiz Performance**
  - **Acceptance Criteria**:
    - Quiz performance statistics (e.g., total questions, correct answers, and percentage) only appear in the Statistics Tab after Test Mode is unlocked and completed.
    - Updates dynamically after each completed quiz.

---

## **Phase 5: Local Deployment and Optimization**
### Goal: Finalize the app and prepare it for local use.

- [ ] **Test fully functional app locally**
  - **Acceptance Criteria**:
    - All previously defined features are working as intended.
    - The app runs locally without errors using `npm run dev` or `yarn dev`.

- [ ] **Add instructions for local deployment**
  - **Acceptance Criteria**:
    - A `README.md` file is created with clear instructions on how to:
      - Clone the repository.
      - Install dependencies.
      - Run the app locally.

- [ ] **Provide suggestions for future deployment**
  - **Acceptance Criteria**:
    - The `README.md` includes deployment suggestions, such as using Netlify, Vercel, GitHub Pages, or Render with free tiers.

---

## **Stretch Goals**
These are optional features that can enhance the user experience in future iterations of the app.

- [ ] Implement animations for enhanced user experience (e.g., card flipping animations, progress bar transitions).
- [ ] Add responsiveness for mobile devices, ensuring the app works well on smaller screens.
- [ ] Allow users to choose the number of fill-in-the-blank questions in Test Mode.
- [ ] Provide an option to download user statistics as a CSV file.

---

## **Phases Summary**
### Phase 1: Project Setup and Basic Flashcards
- Set up Vite project.
- Install Material-UI and configure.
- Create `flashcards.json`.
- Implement flashcard display and navigation.

### Phase 2: User Feedback
- Add buttons to mark answers.
- Track and display flashcard progress.
- Add functionality to shuffle cards and review incorrect answers.

### Phase 3: Test Mode
- Unlock test mode after flashcards are completed.
- Set up fill-in-the-blank questions and feedback system.

### Phase 4: Statistics Tab
- Add flashcard performance statistics in the Statistics Tab.
- Add quiz performance results in the Statistics Tab after the quiz is unlocked.

### Phase 5: Deployment and Optimization
- Test feature completeness locally.
- Create a detailed `README.md` with local deployment and future deployment suggestions.

--- 
This checklist provides a structured and actionable guide for completing the flashcard app implementation!
# Testing out cursor agentic mode 
## cursor-card-app

Testing using cursor for a simple app - flashcards for learning about LLM's.

These are my actions and some observations during this trial.




=========================
# Prompts I used to evaluate cursor: 

## Initial Prompt: 

I need help writing a software specification:

I want a flashcard app to help learn terms common to llm development in the form of a web app. I want to use javascript with vite and react.

Here are the features I will need:
 - each card should have a term on the front and the definition of that term on the back but explained to the user like they had never heard the term before so please simplify terms and concepts
 - Each card should have a "Got it Right!" and "Got it Wrong" button under the definitions and the app should keep track of which the user marked as right and which where marked as wrong.
- Feature: after going through the deck, users should have the option of cycling through the ones they got wrong again and being able to re-mark them, changing the state from wrong to right.
- feature: after the flash cards are 100% complete a new 'test mode' should be available that features five "fill in the blank" questions that use 5 terms from the flashcards as answers.
- there should be a statistics tab that the user can do to anytime that shows how much progress they have made in getting the answers correct. there should be two separate sections on this tab - one for the flash cards and one for the quiz. the quiz portion should not show until it is unlocked after the cards are 100% complete.
- There should be 10 cards initially with terms and definitions common to concepts people learn when learning about LLM's.
- the output should be in a markdown file.

please ask follow up questions if anything is unclear before generating the specifications

## Follow up questions from Claude 4.5

To write an accurate and comprehensive software specification for the flashcard app, I need to clarify a few aspects of your request so that I can ensure the final output aligns perfectly with your vision:

How are the flashcards stored?

Would you like the flashcards' data to be hardcoded within the application at first (e.g., stored in a local file used by the app)? Or would you prefer some kind of backend/database to allow for scalability, or keeping track of user progress persistently?
User data persistence:

Should user progress (e.g., scores, correct/incorrect state, quiz results) persist across sessions? If so, would you like to use browser storage (e.g., localStorage) or a database backend for this functionality?
User authentication:

Do you want users to create accounts so their progress can be tracked across devices, or is it fine if all the progress is tied to a specific browser/session without the need for login?
Flashcard content management:

Should users have the ability to add their own cards, or modify the existing collection of 10 cards? Or is the content hardcoded/static for now?
Flashcard revisiting flow:

Regarding revisiting "wrong" answers: should the flashcards appear in order, or should they be shuffled in subsequent cycles?
Testing Mode details:

Should the "fill in the blank" questions automatically populate with randomized terms, or should there be a separate mechanism for defining these questions and answers? For example:
Should the definition be displayed with a blank term to fill in?
Would you prefer an interface for teachers/content creators to explicitly define how a "fill in the blank" question maps to each term?
Statistics details:

What kind of details do you want in the statistics tab?
For example:
Total number of cards answered correctly and incorrectly.
Percentages for each.
Per-card performance tracking.
Quiz performance (time taken, accuracy, attempts per question, etc.).
Let me know how detailed you want the stats, and feel free to suggest other metrics!
Styling and UI/UX preferences:

Do you have any design preferences, such as color schemes, layout style (e.g., clean/minimal vs. colorful/playful), or specific inspirations from existing apps?
Deployment:

How do you want to deploy the app? For example, should I include instructions for deployment on platforms like Vercel, Netlify, or your server? Or do you want the app to be developer-focused and run primarily on localhost?
If you could provide me with more details regarding these, I can draft a detailed and accurate software specification that meets all of your requirements. Let me know!

## My Followup answers:

1. hardcoded in a seperate .json file - this is just a proof of concept. 
2 - user data can be ephemeral. no sessions needed. 
3 - no login auth / auth needed. 
4 - no just static for now. 
5 - shuffled. 
6 - blank with a term to fill in. 
7 - just total number of cards answered correctly and quiz preformance. 
8 - please use material design specifications. 
9 - this is a proof of concept and is only being deployed locally. Please add a specification with sugestions on how where to deploy an app like this using free tiers. 

___ Generated specifications.md included in project

===

## Actionable list

Next - asked it:

Take this specification and create a TODO list with checkboxes to help implement one feature at a time. Order the features from easy to hard in phases. For each item in the list, also define acceptance criteria.  The output should be in Markdown format.

Then, added output - TODO.md


* Note: the LLM I am using (Claude) prefaced the TODO instructions to my initial prompt but I re-ran it without so I could review the specifiactions with out it first.

===========================================

# Moving on to implementation:

left on agentic - set to auto model selection to see what it would do. Leaving off any auto accepting so I can watch the process more close.

using prompt: 
"Using the software requirements listed in @cursor-card-app/docs/specifications.md  and the TODO list please complete phase 1 of the project. Mark items as done in the todo list file only after you verify that the acceptance criteria has been met."

Notes: Seems as if it couldn't access NPM for vite template files so grabed files for vite templating file-by-file from github, also made some interesting choices when running dev like using Start-Sleep in terminal before continuing after dev started. Additionally systimatic approach in installing packages as needed.  


============
# Phase 2 9:35 start
prompt was 'please implement stage two in the specifications.md and upate the todo.md file to reflect the stages completed.

Note: I like that I can see the planned actions being completed in the todo list provided by cursor. Process took about 5 minutes - after that checked to confirm that the todos where implemented properly in the code then I ran it.
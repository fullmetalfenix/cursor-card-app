# Testing out cursor Agentic mode 
## cursor-card-app

Testing using cursor for a simple app - flashcards for learning about LLM's.

These are my actions and some observations during this trial. I have tried Kiro and liked it and I'm now trying out another major Agentic coding environment, cursor.




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

1. hardcoded in a separate .json file - this is just a proof of concept. 
2 - user data can be ephemeral. no sessions needed. 
3 - no login auth / auth needed. 
4 - no just static for now. 
5 - shuffled. 
6 - blank with a term to fill in. 
7 - just total number of cards answered correctly and quiz performance. 
8 - please use material design specifications. 
9 - this is a proof of concept and is only being deployed locally. Please add a specification with suggestions on how where to deploy an app like this using free tiers. 

___ Generated specifications.md included in project

===

## Actionable list

Next - asked it:

Take this specification and create a TODO list with checkboxes to help implement one feature at a time. Order the features from easy to hard in phases. For each item in the list, also define acceptance criteria.  The output should be in Markdown format.

Then, added output - TODO.md


* Note: the LLM I am using (Claude) prefaced the TODO instructions to my initial prompt but I re-ran it without so I could review the specifications with out it first.

===========================================

# Moving on to implementation:

left on agentic - set to auto model selection to see what it would do. Leaving off any auto accepting so I can watch the process more close.

using prompt: 
"Using the software requirements listed in @cursor-card-app/docs/specifications.md  and the TODO list please complete phase 1 of the project. Mark items as done in the todo list file only after you verify that the acceptance criteria has been met."

Notes: Seems as if it couldn't access NPM for vite template files so grabbed files for vite templating file-by-file from github, also made some interesting choices when running dev like using Start-Sleep in terminal before continuing after dev started. Additionally systematic approach in installing packages as needed.  


============
# Phase 2 9:35 start
prompt was 'please implement stage two in the specifications.md and update the todo.md file to reflect the stages completed.

Note: I like that I can see the planned actions being completed in the todo list provided by cursor. Process took about 5 minutes - after that checked to confirm that the todos where implemented properly in the code then I ran it.


=============================
# Automating Testing

first - conversation with ai - prompt: "what kind of tests cases does it make sense to have for this application?"

It has recommended tests for flipping behavior, various tests for checking if state is being updated and maintained properly, ui is being dynamically displayed at the right times and navigation remains intact - so far so good. It has also recommended future tests from skipping ahead in the specifications doc.

Prompt: 
for the functionality that has been implemented so far, please write end-to-end tests using playwright.

* Here problems occurred - when cursor implemented tests then it wrote them in a way that they would fail - most notably the test where designed to pick DOM nodes based on text but as I am using MUI for this it didn't pick up on the aria labels overwriting that text so they all failed. At this point I ran out of free requests for Cursor as the project is expanding in scope so testing cursor for Agentic Development is at an end. I have switched to Amazon Q to continue this Agentic test. 


## Rules:

Added a .cursor/rules directory with testing.mdc file. Note - you don't have to use markdown and you can @ files in here. 
 - these are project specific rules, you can add global rules as well for style guides etc.



# Refactoring

After a few features are created - making it readable, maintainable and efficient. Added rule to comment code automatically. It was recommended that you change to a reasoning / thinking model to comment the code.

Prompt:
"please refactor the codebase with a goal of preserving its behavior, being more efficient and more maintainable. Add comments to any important pieces of functionality describing what the functionality does and how it relates to other components or functions. These comments should be geared towards the goal of another developer being able to take this project and when looking around they should understand how the files relate to each other and the different functionality that compose the app." 

* note: Cursor has hit is limit so I am using Amazon Q. with VS Code to continue. I still want to see how far this project can go using free tools. I was having a problem with Cursor any way as it was saying that all I could use was the auto model selection or GPT 41. but it did not offer GPT 4.1 and would not let me add it. 

Suggestions from Q to improve the project:
 - Extract shared state management - Create a context for flashcard state to avoid prop drilling
 - Create utility functions - Separate shuffle and statistics calculations
 - Add comprehensive comments - Document component relationships and data flow
 - Optimize re-renders - Use proper memoization
 - Create constants file - Centralize magic strings and values

Some of this might be overkill for a small local project but would be good for a large scale production app and required for one to scale so I though I would let it run and evaluate the results.  

Results - Refactor went great though it was drastically overkill for this project. Some notes though. First it changed the statistics page header so it failed the test for that page so that had to be fixed. It also generated two new reports - one creating the architecture and decisions that really provided an impressive amount of transparency. The other, "refactoring.md" really wasn't necessary but couldn't hurt. In a large project this would have had value though. 



## Accessing MCP servers:

LLM's do not naturally have access to fresh data so MCP is here to give LLM's access to content and tools. The difference between an MCP server and an API is that with API's you have to know the endpoints explicitly where as exposing an MCP server opens up services offered by the server (usually data and tools) to be read and understood by an LLM - including when too use what and how the data is going to be formatted. Another difference? MCP servers are NOT stateless and can remember conversational context between calls. Another difference is that API's are called and information is handled by the developer's framework for doing such actions where as MCP communication is driven by the LLM Agents. Think of it like going to the library for data - with an API you would have to be familiar with the library's filing system and go and get the data (book I guess) yourself where as with MCP you would just ask the front desk for what you want and they could get it for you. Error handling is also supposed to be easier as with an API call you just get an error message most of the time where as an LLE is supposed to be able to get more information from an MCP server about what went wrong.

Use MCP when you are finding yourself doing repeated actions in cursor or adding new functionality - example - there are security mcp servers like Aikido Security that you can use to connect to Aikido Security and have your agent use code / secrets scanning - you do still need a api key though.


There are a ton of MCP servers you can include in your project located here: https://cursor.directory/mcp


### Add GitHub MCP server (VS Code) 

------------------Note: starting here .....

This project now includes a VS Code MCP config at `.vscode/mcp.json`.

1. Open this workspace in VS Code.
2. Run the command `MCP: List Servers` and start `github` if it is not already running.
3. When prompted, enter your GitHub Personal Access Token.
	- Typical read/write repo automation scope: `repo`
	- Public-only workflows: `public_repo`
4. Trust the server when VS Code asks.

Server command:
- `npx -y @modelcontextprotocol/server-github`

--------------------- and ending here was generated by copilot.

I switched from cursor to vs code once I hit the cursor free tier limit. Interestingly enough, when I was setting up the MCP server connection in VS Code for github copilot actually started to set up the config like it was still in cursor as it had read the readme and decided that was the way to go.


Note - you need a Personal access token for the MCP Server here: 
https://github.com/settings/personal-access-tokens
set it up how you want - I am doing fine grain (only the repo for this project) and giving issue and content read/write privileges (minimum scope).

This method also stores the PAT locally and not in your code making it less likely to get into the Agents context (should be safe but please don't take my word for it)

To start the MCP server once it is set up:
- command pallette > "MCP: List Servers" > Github > Start
- Give your Personal Access Token to the prompt.
- command pallette > "MCP: List Servers" to check if its running

Note: at this point I had a Github MCP server running and asked for a list of pull request to test the connection and the model tried to curl it anyway. I canceled and specifically asked it to use the Github MCP server and it did. Next request was for a list of commits and the model tried a mix of things MCP and Terminal requests. 

All Set with an Github MCP server. 

Another note: For evaluation purposes I then asked the agent to commit and push my code and it did with a thoughtful, short and accurate commit message so worked great in this case. 
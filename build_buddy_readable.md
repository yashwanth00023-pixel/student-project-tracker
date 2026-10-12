# Student Build Buddy

Use one active project folder. Follow modules in order. Keep a server terminal and a separate command terminal. Prompts are scoped examples, not guarantees: inspect AI output before accepting it.

## Module 0: Sunday: prepare and prove readiness

### M0.01 - Create the workshop folder

In File Explorer open Documents and create WebDev Certification. Put the student_kit.zip received through WhatsApp there. Right-click the ZIP > Extract All and extract into student_kit inside that folder. Do not work inside the ZIP.

### Checkpoint

Inside WebDev Certification > student_kit you can see checkpoints, guide.html and the readable instructions.

### Explain it

The main workshop folder holds the kit and active app; VS Code will open the active app subfolder.

### If blocked

Ask the TA to identify the extracted folder. Windows is the command baseline; other operating systems need a faculty rehearsal.

### M0.02 - Install Node and verify the runtime

Open https://nodejs.org/en/download/archive/v22.23.3 in your browser. For a typical Windows x64 laptop download the Windows x64 .msi installer. Use the installer defaults, including PATH. Skip optional native build tools. ARM laptops need the ARM installer and a TA check. Close and reopen the terminal after installing.

### Copyable command

```powershell
node --version
npm.cmd --version
```

### Checkpoint

node --version returns v22.23.3; npm.cmd --version prints a version number.

### Explain it

Node runs JavaScript outside the browser; npm installs the project dependencies.

### If blocked

If command not found, reopen the editor and terminal. If another version is installed, the TA must test node:sqlite before marking ready; do not uninstall tools blindly.

### M0.03 - Install Git and verify it

Open https://git-scm.com/downloads/win. Run the Windows installer, keeping the PATH option that enables Git from the command line. Reopen the terminal.

### Copyable command

```powershell
git --version
```

### Checkpoint

git --version prints a version.

### Explain it

Git tracks local source changes.

### If blocked

If missing, restart the terminal or ask the TA to check PATH.

### M0.04 - Prepare VS Code and ChatGPT

Install VS Code from https://code.visualstudio.com/download using the Windows installer matching your laptop. Open VS Code. Open https://chatgpt.com in a separate browser tab and sign into your own account. Do not install an AI extension for this workshop.

### Checkpoint

VS Code opens, and ChatGPT responds to a simple explanation request.

### Explain it

VS Code edits local files; ChatGPT suggests explanations and code. It does not directly read or edit your laptop files.

### If blocked

Use the official VS Code installer; ask faculty for help if installation rights are restricted. If ChatGPT is unavailable, reference patterns still allow the task.

### M0.05 - Copy the readiness project

In File Explorer open Documents > WebDev Certification > student_kit > checkpoints. Copy 00-ready into WebDev Certification and rename the copy student-project-tracker. In VS Code choose File > Open Folder and select student-project-tracker. Trust only this known workshop folder if prompted. Choose Terminal > New Terminal. If the terminal is not PowerShell, use the terminal dropdown > Select Default Profile > PowerShell, then open a new terminal. Check the current directory and files.

### Copyable command

```powershell
Get-Location
dir
```

### Checkpoint

VS Code Explorer shows package.json, server.js and public; Get-Location ends in student-project-tracker.

### Explain it

npm and Git commands run in the active app folder, not the ZIP or the main workshop folder.

### If blocked

Use File > Open Folder, not Open File. Keep only one active tracker folder.

### M0.06 - Install project dependencies

In the student-project-tracker terminal run npm.cmd ci. The released checkpoint includes package-lock.json. Wait for installation to finish.

### Copyable command

```powershell
npm.cmd ci
```

### Checkpoint

node_modules exists and npm exits without an install error.

### Explain it

The lockfile pins the dependency tree; source and dependencies are different.

### If blocked

If a network error occurs, retry using the approved network. Use faculty-prepared matching dependencies only as an emergency; no random packages.

### M0.07 - Run and view the readiness page

Start the server. Keep this terminal running. Open http://localhost:3000 in the browser address bar. The readiness page contains only a heading and readiness message; the interface is built in Session 1.

### Copyable command

```powershell
npm.cmd start
```

### Checkpoint

Terminal prints Open http://localhost:3000 and browser shows Student Project Tracker.

### Explain it

The local server responds to the browser request. This is readiness, not the finished app.

### If blocked

If port is occupied, stop the previous workshop server with Ctrl+C. Do not kill unrelated processes. Check that the address is http rather than a file path.

### M0.08 - Verify GitHub sign-in

Open https://github.com and sign in to your own account or choose Sign up. Complete email verification and any required authentication. Keep your password private.

### Checkpoint

Your own username is visible in the account menu.

### Explain it

GitHub is the remote home for source commits.

### If blocked

Account recovery can take time. Record the blocker on Sunday; a student without an account is not GitHub-ready.

### M0.09 - Configure your Git identity

Open a second terminal in the project. Replace the quoted identity examples with your own name and GitHub email or no-reply address, then run the commands.

### Copyable command

```powershell
git init -b main
git config user.name "YOUR NAME"
git config user.email "YOUR GITHUB EMAIL"
git config user.name
```

### Checkpoint

git config user.name returns your name; git status runs successfully.

### Explain it

Identity labels the author of a commit; it does not sign you into GitHub.

### If blocked

Use repository-local identity. Never paste passwords or access tokens into git config.

### M0.10 - Make the readiness commit

Read .gitignore; check that data, credentials and node_modules are excluded. Stage the source and lockfile, then commit.

### Copyable command

```powershell
git status
git add .
git commit -m "Verify workshop readiness"
git log --oneline
```

### Checkpoint

git status reports a clean working tree and git log --oneline shows the readiness commit.

### Explain it

A commit is a local checkpoint; nothing has been uploaded yet.

### If blocked

If identity is missing, complete the previous step. If sensitive files are staged, ask the TA before committing.

### M0.11 - Create the empty GitHub repository

On GitHub choose New repository. Name it student-project-tracker. Choose the visibility you want. Do not initialize with README, .gitignore or licence because the local project already exists. Create the repository and copy its HTTPS URL.

### Checkpoint

GitHub displays instructions for pushing an existing repository.

### Explain it

The remote starts empty to avoid unrelated history conflicts.

### If blocked

If you initialized it by mistake, ask the TA; do not force-push over existing work.

### M0.12 - Push the readiness commit

Replace the sample URL with the HTTPS URL you copied. Run the commands. Complete the Git credential manager browser sign-in if prompted. Refresh the repository page.

### Copyable command

```powershell
git remote add origin https://github.com/YOUR-USERNAME/student-project-tracker.git
git push -u origin main
```

### Checkpoint

GitHub shows public, package.json and your readiness commit; node_modules, data and .env are absent.

### Explain it

Push sends commits to the online account; this does not deploy the app.

### If blocked

If remote origin already exists, inspect git remote -v instead of adding it again. Resolve account/access errors with the TA; never use a force push.

## Module 1: Session 1: understand and build the HTML

### M1.01 - Trace the finished demonstration

Watch the instructor add IoT Monitor, edit its status, refresh the page and restart the server. Sketch Browser -> API -> Database and the return response.

### Checkpoint

Your sketch identifies the browser and storage as different places.

### Explain it

The final app preserves data outside browser memory.

### If blocked

Ask which process handles a request; do not memorize all terminology at once.

### M1.02 - Predict the unstyled page

Open public/index.html in the editor. Find head, body, main and h1 in the readiness skeleton. Sketch where the form and project list will go. Predict what removing the h1 text would change without changing the code.

### Checkpoint

You can point to the file responsible for the heading and describe the missing form structure.

### Explain it

HTML gives the page structure and meaning.

### If blocked

Use checkpoint 01-html as the target reference, not as a replacement for explaining the elements.

### M1.03 - Build the tracker HTML

Ask AI to expand only public/index.html from the readiness skeleton into the agreed semantic interface. Explain the proposed elements first. Include your own introductory paragraph. Save and refresh; inspect labels and controls.

### Bounded AI prompt

```text
Build only public/index.html for a Student Project Tracker. Use main, header and sections. Include h1 and introductory paragraph "Track our electronics project ideas." Add h2 id=form-title; form id=project-form; label/input id=name required maxlength=80; label/select id=status with Planned, In Progress, Completed; button id=save-button type=submit; hidden button id=cancel-button type=button. Add p id=message role=status aria-live=polite; h2 id=list-title; p id=empty-state; ul id=project-list. Link style.css and script.js with defer but leave those files empty. Explain semantic structure and label associations before creating it. I use ChatGPT in a browser and VS Code separately. You cannot see or edit my local files. Ask me to paste the relevant current file if needed. Return the code for only the named files, with exact filenames and replacement boundaries; I will apply and save it myself in VS Code. Preserve existing ids and filenames. No React, new dependencies, backend, deployment or extra features unless explicitly requested. Explain the proposed changes first, then provide one bounded change. Show what changed and how to test it. Stop after this task.
```

### Checkpoint

The heading, name/status form, Add button, message and empty project list appear. CSS and JavaScript remain empty.

### Explain it

A controlled HTML build teaches the file-to-browser connection without generating a complete app.

### If blocked

If AI changes other files or adds behaviour/frameworks, reject that proposal. Restore only index.html from 01-html after saving your attempt, then explain and customize it.

### M1.04 - Inspect the browser document

In the browser open DevTools using F12 or Ctrl+Shift+I, choose Elements, and locate the h1 and form. Compare them with index.html.

### Checkpoint

The browser document includes your heading and form ids.

### Explain it

The DOM is the live browser representation of the document.

### If blocked

Use the browser menu Developer tools if the keyboard shortcut is intercepted.

### M1.05 - Explain the HTML checkpoint

Show your partner the page. Explain what label for="name" connects to, and why Add does not yet save data. Commit the HTML change.

### Copyable command

```powershell
git add public/index.html
git commit -m "Describe tracker and inspect HTML"
```

### Checkpoint

The page displays, the explanation is correct, and Git records your change.

### Explain it

Visible controls do not imply implemented behaviour.

### If blocked

TA records CP1; recover with 01-html if files are broken, then make the paragraph edit yourself.

## Module 2: Session 2: design and style the interface

### M2.01 - Draw the user journey

On paper draw Add project -> see project -> change status. Sketch heading, form, message and list. Mark the primary action and empty state.

### Checkpoint

Your wireframe has one clear Add action, visible labels and a place for feedback.

### Explain it

UX organizes the task before decoration.

### If blocked

Remove extra navigation, charts and login screens from this two-day scope.

### M2.02 - Style the agreed layout

Ask AI for CSS only against the existing HTML. Review selectors before accepting. Save public/style.css and refresh.

### Bounded AI prompt

```text
Style only public/style.css for the existing tracker. Use system fonts, readable contrast, a maximum-width main area, labelled controls, clear focus outlines and spacing. Use flex for card actions and a media query at 560px. No external fonts or libraries. I use ChatGPT in a browser and VS Code separately. You cannot see or edit my local files. Ask me to paste the relevant current file if needed. Return the code for only the named files, with exact filenames and replacement boundaries; I will apply and save it myself in VS Code. Preserve existing ids and filenames. No React, new dependencies, backend, deployment or extra features unless explicitly requested. Explain the proposed changes first, then provide one bounded change. Show what changed and how to test it. Stop after this task.
```

### Checkpoint

The form, cards and buttons have consistent spacing and readable text; no HTML ids changed.

### Explain it

CSS changes presentation while keeping structure and behaviour separate.

### If blocked

Compare with 02-style/public/style.css if necessary; copy a small section and explain it rather than replacing every file.

### M2.03 - Test the mobile layout

Open DevTools device toolbar (Ctrl+Shift+M while DevTools is open) and set width to 390px. Inspect all labels and buttons. Tab through the form using the keyboard.

### Checkpoint

No horizontal page scrolling at 390px; focus is visible and controls remain usable.

### Explain it

Responsive design and keyboard access are observable behaviours.

### If blocked

Check fixed widths, padding and media query if clipped; keep the same HTML.

### M2.04 - Trace one submit event

Watch the instructor show a short submit handler. Identify the form selector, event listener, preventDefault and nameInput.value. Predict the result before running it.

### Checkpoint

You can explain why a submit listener reads the input and stops default navigation.

### Explain it

JavaScript responds to events and manipulates the DOM.

### If blocked

Do not ask AI for persistence or backend at this stage.

### M2.05 - Implement one add interaction

Use 03-browser-memory/public/script.js as the reference pattern. Ask AI to implement only reading the form, adding one object to an array, and rendering its name/status. Preserve HTML ids.

### Bounded AI prompt

```text
In public/script.js implement only Add and Read with a projects array. Read #name and #status on #project-form submit, prevent default navigation, trim the name, and render to #project-list using textContent. Reject blank names. No persistence or API. I use ChatGPT in a browser and VS Code separately. You cannot see or edit my local files. Ask me to paste the relevant current file if needed. Return the code for only the named files, with exact filenames and replacement boundaries; I will apply and save it myself in VS Code. Preserve existing ids and filenames. No React, new dependencies, backend, deployment or extra features unless explicitly requested. Explain the proposed changes first, then provide one bounded change. Show what changed and how to test it. Stop after this task.
```

### Checkpoint

Submitting IoT Monitor / Planned adds one visible item and the page does not navigate.

### Explain it

Form values become data; rendering makes that data visible.

### If blocked

If the selectors do not match, compare ids exactly. If AI stalls, use the reference create/render sections and explain each.

### M2.06 - Verify the interface checkpoint

Add two projects, then refresh. Explain why the records disappear. Commit your HTML/CSS/JavaScript changes.

### Copyable command

```powershell
git add public
git commit -m "Style tracker and add browser interactions"
```

### Checkpoint

Two projects appear before refresh and disappear after refresh; UI remains readable.

### Explain it

Browser memory and DOM are temporary.

### If blocked

TA records CP2. Use 03-browser-memory for recovery only after explaining the event/data/render chain.

## Module 3: Session 3: complete browser CRUD and persistence

### M3.01 - Inspect a project object

Write one sample object on paper with id, name and status. Write an array containing two projects. Predict which property changes when a project is renamed.

### Checkpoint

The id stays stable while name/status may change.

### Explain it

Identity lets Update/Delete target the correct record.

### If blocked

Do not use row index or project name as the stable identity.

### M3.02 - Complete edit behaviour

Ask AI to add Edit using the existing array and id. Fill the form from the selected project and replace that project on save; provide Cancel edit.

### Bounded AI prompt

```text
Add Edit and Cancel edit to the current browser-memory tracker. Use each project id. Editing fills #name and #status; saving updates the selected record, never adds a duplicate. Preserve existing Add and Read. I use ChatGPT in a browser and VS Code separately. You cannot see or edit my local files. Ask me to paste the relevant current file if needed. Return the code for only the named files, with exact filenames and replacement boundaries; I will apply and save it myself in VS Code. Preserve existing ids and filenames. No React, new dependencies, backend, deployment or extra features unless explicitly requested. Explain the proposed changes first, then provide one bounded change. Show what changed and how to test it. Stop after this task.
```

### Checkpoint

Edit IoT Monitor to Smart Home / In Progress: one row changes and no duplicate is added.

### Explain it

Update changes an existing record rather than creating a new identity.

### If blocked

Use 03-browser-memory edit/resetForm pattern if needed. Check editingId and submit branch.

### M3.03 - Complete delete behaviour

Ask AI for Delete by id and confirmation. Test Cancel before testing confirmed deletion.

### Bounded AI prompt

```text
Add Delete by project id with a confirmation dialog. Cancelling must leave data unchanged. If deleting the project being edited, reset edit mode. Keep the current memory model. I use ChatGPT in a browser and VS Code separately. You cannot see or edit my local files. Ask me to paste the relevant current file if needed. Return the code for only the named files, with exact filenames and replacement boundaries; I will apply and save it myself in VS Code. Preserve existing ids and filenames. No React, new dependencies, backend, deployment or extra features unless explicitly requested. Explain the proposed changes first, then provide one bounded change. Show what changed and how to test it. Stop after this task.
```

### Checkpoint

Cancel preserves the project; confirming removes only the selected project.

### Explain it

Delete removes a record; it needs explicit user intent.

### If blocked

Use reference remove handler; check that the selected id, not row position, is used.

### M3.04 - Add browser persistence

Ask AI to save the projects array under workshop-projects-v1 using JSON.stringify and load it using JSON.parse. Use the reference 04-browser-storage store adapter.

### Bounded AI prompt

```text
Persist the current array in localStorage under workshop-projects-v1. Save after create/update/delete and load at startup using JSON. Preserve the UI and ids. Explain what refresh, another browser and another laptop will see. I use ChatGPT in a browser and VS Code separately. You cannot see or edit my local files. Ask me to paste the relevant current file if needed. Return the code for only the named files, with exact filenames and replacement boundaries; I will apply and save it myself in VS Code. Preserve existing ids and filenames. No React, new dependencies, backend, deployment or extra features unless explicitly requested. Explain the proposed changes first, then provide one bounded change. Show what changed and how to test it. Stop after this task.
```

### Checkpoint

Create, edit and delete survive browser refresh at http://localhost:3000.

### Explain it

localStorage is browser-origin storage, not a shared server database.

### If blocked

Malformed old JSON may break startup. TA inspects Application -> Local Storage and removes only workshop-projects-v1 after warning that those demo records will be lost.

### M3.05 - Demonstrate the browser checkpoint

Add IoT Monitor, edit status, delete a second project, and refresh. Explain what survives and why.

### Checkpoint

IoT Monitor persists with its edited status; the deleted project stays absent.

### Explain it

Persistence is verified by an action sequence, not by merely seeing a save message.

### If blocked

TA records CP3. Recover with 04-browser-storage and perform the complete demonstration.

### M3.06 - Push the Day 1 checkpoint

Review changed files and push a new commit to your existing origin. Refresh GitHub and inspect the latest commit.

### Copyable command

```powershell
git status
git diff
git add public
git commit -m "Complete browser CRUD and persistence"
git push
```

### Checkpoint

GitHub shows the Day 1 source and the new commit; private/local artifacts remain absent.

### Explain it

Commit and push are separate operations.

### If blocked

If push is rejected, do not force. TA checks remote and history. Record unresolved GitHub issue before students leave.

### M3.07 - Complete the Day 1 assessment

Answer the Day 1 quiz in the handbook, then individually demonstrate persistence and explain one event handler. Do not ask AI for assessment answers.

### Checkpoint

You score your explanation against the answer key after submitting it.

### Explain it

A working screenshot alone does not establish understanding.

### If blocked

Instructor records misconceptions to address at the Day 2 recap.

## Module 4: Session 4: inspect and run the backend API

### M4.01 - Identify the browser storage limit

Open the app in a different browser or explain the predicted result. Compare this with the instructor backend demo.

### Checkpoint

You can explain why browser-local data is not automatically shared.

### Explain it

A backend separates browser interaction from server-side processing and persistence.

### If blocked

Do not claim a backend without login separates users; our demo data is shared.

### M4.02 - Inspect a request in Network

Open DevTools -> Network and refresh. Find the document request and inspect URL, method, status and response.

### Checkpoint

You can distinguish a request from its response.

### Explain it

HTTP carries messages; JSON is a data format used by the API.

### If blocked

If the list is empty, clear filters and refresh with DevTools open.

### M4.03 - Add the health route

Ask AI to add express.json and GET /api/health to server.js, returning {ok:true}. Stop and restart the server after editing. Open the route in the browser.

### Bounded AI prompt

```text
Add only express.json() and GET /api/health returning JSON {ok:true} to server.js. Keep static serving and port 3000. Explain request, response and res.json. I use ChatGPT in a browser and VS Code separately. You cannot see or edit my local files. Ask me to paste the relevant current file if needed. Return the code for only the named files, with exact filenames and replacement boundaries; I will apply and save it myself in VS Code. Preserve existing ids and filenames. No React, new dependencies, backend, deployment or extra features unless explicitly requested. Explain the proposed changes first, then provide one bounded change. Show what changed and how to test it. Stop after this task.
```

### Checkpoint

http://localhost:3000/api/health shows {"ok":true}.

### Explain it

A route matches an HTTP method and path.

### If blocked

Check that the server was restarted and the route precedes catch-all middleware.

### M4.04 - Introduce the server memory scaffold

Stop the server. Add app.js and database.js from 05-api-memory as the reviewed teaching scaffold; replace server.js with that checkpoint startup file. Keep your own public folder. Restart. The instructor traces one route before students use it.

### Checkpoint

GET /api/projects returns an array and the existing frontend still loads.

### Explain it

At this checkpoint the server memory API and localStorage UI are separate; they are not connected yet.

### If blocked

Backup your current source with a commit before applying the scaffold. Do not replace public or .git.

### M4.05 - Create a project through the API

In a second PowerShell terminal send the POST command. Read returned id/name/status. Browser navigation is GET and cannot substitute for POST.

### Copyable command

```powershell
$body = @{ name = 'IoT Monitor'; status = 'Planned' } | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:3000/api/projects' -Method Post -ContentType 'application/json' -Body $body
```

### Checkpoint

The response contains numeric id and IoT Monitor / Planned; GET /api/projects includes it.

### Explain it

A JSON request carries data to a server route.

### If blocked

400 means inspect the request body and valid status values. Use ConvertTo-Json rather than hand-escaped JSON.

### M4.06 - Trace validation and server memory

Find readProject and the POST handler in app.js. Send a whitespace name, then restart the server and GET the list.

### Copyable command

```powershell
$body = @{ name = ' '; status = 'Planned' } | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:3000/api/projects' -Method Post -ContentType 'application/json' -Body $body
```

### Checkpoint

The invalid request is rejected; the server memory list becomes empty on restart.

### Explain it

Server validation protects data quality; server process memory is still temporary.

### If blocked

PowerShell displays HTTP failures as errors; inspect the response rather than assuming the command syntax failed.

### M4.07 - Explain the API checkpoint

Show the health route and GET list. Point to method/path/body/response in one create example. Commit the backend scaffold.

### Copyable command

```powershell
git add app.js database.js server.js
git commit -m "Add and inspect project API"
```

### Checkpoint

TA records CP4 and student explains why frontend data is still separate.

### Explain it

The API contract is the interface we will preserve when persistence changes.

### If blocked

Recover app.js/database.js/server.js from 05-api-memory only; keep student public files.

## Module 5: Session 5: connect SQLite and the frontend

### M5.01 - Model the projects table

Draw a table with id/name/status and two rows. Mark id as primary key. Match each CRUD verb to SQL.

### Checkpoint

You can identify a row, column, primary key and the four operations.

### Explain it

Relational structure and constraints make persistent data explicit.

### If blocked

Use the project data; do not add unrelated SQL joins or database administration.

### M5.02 - Inspect the SQLite implementation

Open reference 06-full-stack/database.js. Locate CREATE TABLE and the prepared INSERT with placeholders. Compare its list/create/update/remove interface with the memory adapter.

### Checkpoint

You can explain why values are bound separately from the SQL statement.

### Explain it

The storage implementation changes while the route contract stays consistent.

### If blocked

Do not concatenate user text into SQL; keep the parameterized reference.

### M5.03 - Replace server memory with SQLite

Stop the server. Back up by committing. Replace only database.js with 06-full-stack/database.js. Restart and create one project with the earlier POST command.

### Copyable command

```powershell
node --version
npm.cmd start
```

### Checkpoint

data/projects.db exists and GET returns the inserted row.

### Explain it

SQLite is an embedded database; the server is writing a local file.

### If blocked

Check Node version if node:sqlite is unavailable. The experimental warning on Node 22 is informational; an exception is a blocker.

### M5.04 - Verify persistence across restart

Stop the server with Ctrl+C, restart it, then visit GET /api/projects again.

### Checkpoint

The inserted project remains with the same id.

### Explain it

The database file outlives the server process.

### If blocked

Do not delete data/projects.db to fix unrelated errors. Record the path and check the active project directory.

### M5.05 - Inspect the SQLite table directly

In a second terminal in the project, run this read-only query while the server is running.

### Copyable command

```powershell
node --input-type=module -e "import { DatabaseSync } from 'node:sqlite'; const db = new DatabaseSync('data/projects.db'); console.table(db.prepare('SELECT id, name, status FROM projects').all()); db.close();"
```

### Checkpoint

The console table shows id/name/status matching the API response.

### Explain it

The browser response and actual stored row are independent evidence of the same operation.

### If blocked

If table missing, check current directory and whether SQLite server startup succeeded.

### M5.06 - Replace browser storage with fetch

In public/script.js replace only the storage code at the top with the request/store block from 06-full-stack/public/script.js: start at async function request and stop before const form. Remove the old STORAGE_KEY, projects and persist declarations too. Preserve your UI functions. If your AI-generated code lacks that boundary, use the complete reference script as a recovery scaffold and reapply your visible customizations.

### Bounded AI prompt

```text
Replace only the localStorage store adapter in public/script.js with async fetch calls to /api/projects. Preserve list/create/update/remove signatures and existing rendering. POST and PUT send JSON; reject non-OK responses using the API error message. Explain await and response.ok. No direct database access or credentials. I use ChatGPT in a browser and VS Code separately. You cannot see or edit my local files. Ask me to paste the relevant current file if needed. Return the code for only the named files, with exact filenames and replacement boundaries; I will apply and save it myself in VS Code. Preserve existing ids and filenames. No React, new dependencies, backend, deployment or extra features unless explicitly requested. Explain the proposed changes first, then provide one bounded change. Show what changed and how to test it. Stop after this task.
```

### Checkpoint

Adding a project in the UI sends POST /api/projects and its row appears in SQLite.

### Explain it

The browser no longer owns persistence; fetch calls the backend. Old localStorage data is not migrated automatically.

### If blocked

Never run the full-stack frontend from file://. Use http://localhost:3000; check Network and server terminal.

### M5.07 - Verify full-stack CRUD

Create IoT Monitor from the UI; edit to Completed; delete a separate test project; refresh and restart the server. Inspect requests in Network and query the table.

### Checkpoint

POST 201, GET 200, PUT 200, DELETE 200; stored status persists and deleted record stays absent.

### Explain it

The interface, API and database agree through the whole lifecycle.

### If blocked

TA records CP5 only after a UI-originated save reaches SQLite. Recover from 06-full-stack after preserving student work.

## Module 6: Session 6: diagnose, prove and publish the result

### M6.01 - Draw the final request cycle

Individually draw form -> JavaScript -> fetch/HTTP -> Express validation -> SQL -> SQLite -> JSON response -> DOM. Label both directions.

### Checkpoint

You can explain the Add flow without AI or notes.

### Explain it

Architecture understanding means tracing data through boundaries.

### If blocked

Instructor corrects confusion between API, server, database and rendered HTML.

### M6.02 - Diagnose the stopped-server failure

Stop the server, keep the browser open and attempt a save. Record the Network/Console observation. Restart and retry. Do not change source code for this exercise.

### Checkpoint

The UI reports a failure; restoring the server allows saving again without a code change.

### Explain it

An operational failure is not necessarily a code bug.

### If blocked

Do not ask AI to rewrite the app. Identify which boundary failed first.

### M6.03 - Ask AI for an evidence-based diagnosis

Use a real failure from your attempt or the instructor 404 example. Collect method/URL, status/response and relevant output, removing personal details and credentials.

### Bounded AI prompt

```text
Expected: saving a project creates a row. Actual: [describe]. Request method/URL: [copy]. Status/response: [copy]. Console/server output: [sanitized evidence]. Relevant code: [small excerpt]. Identify likely causes before editing, propose one diagnostic check, and change only the affected section after the check. Do not rewrite the app.
```

### Checkpoint

AI identifies likely causes tied to evidence and proposes one test before a change.

### Explain it

A diagnosis should explain observed evidence, not guess a complete rewrite.

### If blocked

If AI requests .env or credentials, decline and provide sanitized configuration names only.

### M6.04 - Verify user feedback states

Test empty list, blank input, slow request using DevTools throttling, save success, failure and cancel-delete. Disable repeated submissions while saving. Compare with 06-full-stack reference.

### Bounded AI prompt

```text
Review existing UI feedback only. Add or repair loading, success, error and empty states. Disable form and row buttons while a mutation is pending; always re-enable in finally. Use textContent for project names. Keep the API and database unchanged. I use ChatGPT in a browser and VS Code separately. You cannot see or edit my local files. Ask me to paste the relevant current file if needed. Return the code for only the named files, with exact filenames and replacement boundaries; I will apply and save it myself in VS Code. Preserve existing ids and filenames. No React, new dependencies, backend, deployment or extra features unless explicitly requested. Explain the proposed changes first, then provide one bounded change. Show what changed and how to test it. Stop after this task.
```

### Checkpoint

The user receives readable feedback and repeated clicks do not create extra requests while busy.

### Explain it

UX includes behaviour during waiting and failure, not only styling.

### If blocked

Limit work to reference feedback behaviour. Remove throttling after the test.

### M6.05 - Run the final verification

Perform the final acceptance sequence in the handbook. Faculty may copy test/crud.test.js from 06-full-stack into your project for the automated check. Run npm.cmd test only with the tested scaffold; a custom architecture may need adapted tests.

### Copyable command

```powershell
npm.cmd test
```

### Checkpoint

All required behaviour passes; the test prints a passing result for reference architecture.

### Explain it

Tests are evidence within their scope; they do not prove production security.

### If blocked

If a test fails, use its observed result and inspect the relevant route/store rather than bypassing it.

### M6.06 - Write your project README

Edit README.md to include what you built, exact run commands, file roles, CRUD evidence, architecture diagram and demo limitations. Include your name only if you want it public.

### Checkpoint

Another student can read the README and run the project.

### Explain it

Documentation connects source code to repeatable execution.

### If blocked

Use the supplied README as a starting point; do not claim hosting or tests you did not perform.

### M6.07 - Push the completed project

Inspect git status and diff. Confirm .gitignore excludes local data and credentials. Commit source, tests, README and lockfile; push; open GitHub to verify the final commit.

### Copyable command

```powershell
git status
git diff
git add .
git commit -m "Complete full-stack project tracker"
git push
```

### Checkpoint

Your own account has the final source and README, with no node_modules, database file or .env.

### Explain it

Online source delivery is mandatory; live deployment is the instructor demonstration.

### If blocked

TA records CP6 including repository URL. If a secret was exposed, stop and rotate it; removing the file from the latest commit alone is insufficient.

### M6.08 - Complete the final assessment

Demonstrate create/edit/delete and persistence, then explain one request cycle individually. Observe the faculty live demonstration and list what changed between local and hosted execution.

### Checkpoint

You can trace all layers, provide your GitHub URL and identify hosting plus database configuration.

### Explain it

Completion combines working software, evidence and explanation.

### If blocked

Use the rubric in the handbook. Priority-field extension is optional only after required outcomes.

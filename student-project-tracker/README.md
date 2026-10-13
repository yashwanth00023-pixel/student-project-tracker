# Student Project Tracker

A hands-on web app development workshop project. It adds, displays, edits and deletes engineering projects, with data stored in local SQLite.

## Run locally
Use the workshop Node 22 baseline (at least 22.18, below 23), Git and VS Code.
Open a PowerShell terminal inside the project, then run:

    npm.cmd ci
    npm.cmd start

Open http://localhost:3000. Stop the server with Ctrl+C.

## How it works
Browser HTML/CSS/JavaScript -> fetch/HTTP -> Express API -> SQLite -> JSON response -> updated page.
- public/index.html: page structure and form.
- public/style.css: appearance and responsive layout.
- public/script.js: input, API requests, rendering, feedback, and the search, status filter and sort for the list.
- server.js: routes, validation and responses, and starts the local server (port 3000, or the PORT environment variable). This project has no separate app.js.
- database.js: SQLite operations; creates data/projects.db locally.

## API
GET /api/health; GET and POST /api/projects; PUT and DELETE /api/projects/:id.

## Verification
Checks performed on 13 October 2026, on Windows 11 with Node v24.12.0 (newer than the workshop baseline; npm may print an engine warning). The browser checks were driven in headless Chrome through its DevTools protocol, which records the same requests as the DevTools Network tab. Only disposable records named "Test ..." and "Failure Test" were used, and all were deleted afterwards.

- Storage: public/script.js uses fetch to /api/projects only; there is no localStorage in the project.
- Reference API test: `npm.cmd test` first failed with "Server did not start." because server.js always listened on port 3000 and ignored PORT. After server.js was changed to read PORT, the test passes (1 test, 0 failures).
- Initial load: "Loading projects..." with controls disabled while the GET was pending, then "Projects loaded."
- Create: two records added; each sent one POST (201) followed by one GET (200) and showed "Project saved."
- Edit: record id 7 renamed and set to Completed with PUT /api/projects/7 (200); the id stayed 7.
- Cancel edit: no request was sent, the record was unchanged, and the form returned to "Add a Project".
- Delete: choosing Cancel in the confirmation sent no request and kept the record; choosing OK sent DELETE (200) and removed it.
- Persistence: the list was the same after a browser refresh and after a server restart.
- Validation: an empty name was blocked by the required field with no request; a spaces-only name showed "Please enter a project name." with no request.
- Stopped server: one POST failed with net::ERR_CONNECTION_REFUSED and no HTTP status. The page showed "Network error. Check that the server is running.", kept the typed name and status, and re-enabled the controls. After `npm.cmd start`, one click saved the record (201) and exactly one row existed.
- Slow network (2 s latency, 50 KB/s): six clicks on Save plus one scripted submit while "Saving..." was shown sent exactly one POST and created one row. Throttling was then switched off.
- Keyboard: Tab moves through name, status, Save, then each Edit and Delete, with a visible 3px focus outline; Enter in the name field saves.
- 390px-wide view: no horizontal scrolling and no control wider than the screen.
- Page fix: stray Markdown code-fence lines at the top and bottom of public/index.html were showing as text on the page and were removed.

- Restyle: the page was then given a Vaporwave 90s theme with small animations (it stays light on devices set to dark mode, so the status menu is always readable). The reference test and the browser sequence above were run again afterwards and passed. The disposable records were deleted through the page and the API was confirmed back to the original three rows. Error messages now show in red (they were green before), and a page icon removed a 404 for favicon.ico.
- Search, filter and sort: checked in the browser with six rows. Search matches part of a name in any letter case; the All / Planned / In Progress / Completed buttons show counts and filter the list; sorting works by newest, oldest, name and status; a search with no match shows "No projects match your search or filter."; adding a project clears the search and filter so the new row is visible. These work in the browser only and send no extra requests.

If the supplied test/crud.test.js is present, run npm.cmd test. It tests the reference API using a temporary database, not browser interactions.

## Workshop limitations
This local teaching app has no sign-in or per-user permissions. Browsers calling the same server share its collection. The SQLite data file and node_modules are not uploaded to GitHub. Cloud hosting requires separate server and database configuration.

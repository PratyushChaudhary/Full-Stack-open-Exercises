sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa/main.css
    activate server
    server-->>browser: The CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa/spa.js
    activate server
    server-->>browser: The JavaScript file
    deactivate server

    browser->>server: GET /exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "Note 1", "date": "2023-10-01" }, ... ]
    deactivate server

    Note right of browser: Notes are rendered
    browser->>browser: redrawNotes()

    Note right of browser: User submits a new note
    browser->>browser: onsubmit event triggers
    Note right of browser: Note is created and added to local state
    browser->>browser: notes.push(note)
    browser->>browser: redrawNotes()

    Note right of browser: Send new note to server
    browser->>server: POST /exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created (new note added)
    deactivate server
% In the provided Single Page Application (SPA) code, the new note is first rendered on the website (client-side) and then posted to the server.
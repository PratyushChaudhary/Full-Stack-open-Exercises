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

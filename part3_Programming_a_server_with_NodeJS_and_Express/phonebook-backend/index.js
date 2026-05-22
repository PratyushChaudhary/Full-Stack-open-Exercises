const express = require("express");
const morgan = require("morgan")
const app = express();

app.use(express.json());
app.use(express.static('dist'))

morgan.token('req-body', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const len = persons.length;
  const now = new Date();

  response.send(
    `<div>Phonebook has info for ${len} people</div><div>${now.toString()}</div>`,
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  const person = persons.find((p) => p.id === id);

  if (person) response.json(person);
  else response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

const generateId = () => {
  return Math.floor(Math.random() * 1000);
};

app.post("/api/persons", (request, response) => {
  const person = request.body;
  const found = persons.find((p) => p.name === person.name);

  if (!person.number || !person.name) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (found) {
    return response.status(409).json({
      error: "name must be unique",
    });
  }

  person.id = String(generateId());

  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

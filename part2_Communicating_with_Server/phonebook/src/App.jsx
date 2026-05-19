import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const confirmed = window.confirm(
        `${personObject.name} is already added to phonebook, replace the old number with a new one`,
      );
      if (confirmed) {
        personService
          .update(existingPerson.id, personObject)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? response.data : person,
              ),
            );
          });
      } else {
        console.log("Action cancelled.");
      }
    } else {
      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
      });
    }
    setNewName("");
    setNewNumber("");
  };
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase()),
  );
  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);

    const confirmed = window.confirm(`Delete ${person.name}?`);

    if (confirmed) {
      personService.deleteItem(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    } else {
      console.log("Action cancelled.");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;

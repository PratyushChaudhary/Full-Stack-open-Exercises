import React from "react";
import countryService from "./services/countries";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    countryService.getAll().then((response) => setCountries(response.data));
  }, []);
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(newSearch.toLowerCase()),
  );

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  return (
    <>
      <div>
        find countries:
        <input value={newSearch} onChange={handleSearchChange} />
      </div>

      <Filter filteredCountries={filteredCountries} setNewSearch={setNewSearch} />
    </>
  );
};

export default App;

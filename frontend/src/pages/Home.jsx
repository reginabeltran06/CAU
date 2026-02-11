import React, { useEffect, useState } from "react";
import { getPersons } from "../services/personService.js";
import PersonCard from "../components/PersonCard.jsx";
import PersonOffcanvas from "../components/PersonOffcanvas.jsx";

export default function Home({ search = "" }) {
  console.log("search:", search);

  const [persons, setPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    getPersons().then(data => setPersons(data));
  }, []);


  const normalizedSearch = search.trim().toLowerCase();

  const filteredPersons = persons.filter(person => {
  if (!normalizedSearch) return true; 

  const nombre = person.nombre?.toLowerCase() || "";
  const turno = person.turno?.toLowerCase() || "";

  return (
    nombre.includes(normalizedSearch) ||
    turno.includes(normalizedSearch)
  );
});


  return (
    <div className="container mt-4">
      <div className="row">
        {filteredPersons.map(person => (
          <PersonCard
            key={person._id}
            person={person}
            onClick={setSelectedPerson}
          />
        ))}
      </div>

      <PersonOffcanvas
        person={selectedPerson}
        onClose={() => setSelectedPerson(null)}
      />
    </div>
  );
}

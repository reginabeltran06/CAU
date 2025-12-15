import React, { useEffect, useState } from "react";
import { getPersons } from "../services/personService.js";
import PersonCard from "../components/PersonCard.jsx";
import PersonOffcanvas from "../components/PersonOffcanvas.jsx";

export default function Home() {
  const [persons, setPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    getPersons().then(data => setPersons(data));
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {persons.map(person => (
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

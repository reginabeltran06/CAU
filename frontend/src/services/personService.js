export async function getPersons() {
  const response = await fetch("http://localhost:3000/api/persons");
  return response.json();
}

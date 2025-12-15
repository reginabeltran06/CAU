const API_URL = "https://cauapi.vercel.app"; 

export async function getPersons() {
  const response = await fetch(`${API_URL}/api/persons`); 
  
  if (!response.ok) {
    throw new Error(`Error al obtener personas: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}
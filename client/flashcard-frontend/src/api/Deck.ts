const BASE_URL = import.meta.env.VITE_BASE_URL;

 
// Fetch all decks
export const getAllDecks = async () => {
  try {
    console.log("BASE_URL:", BASE_URL,import.meta.env);
    const response = await fetch(BASE_URL, { method: "GET" });
    if (!response.ok) throw new Error("Failed to fetch decks");
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching decks:", error);
    throw error;
  }
};

// Create a new deck
export const createDeck = async (title: string) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) throw new Error("Failed to create deck");
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating deck:", error);
    throw error;
  }
};

// Delete a deck by ID
export const deleteDeck = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete deck");
    return true; // Successful deletion
  } catch (error) {
    console.error(`Error deleting deck with ID ${id}:`, error);
    throw error;
  }
};

const BASE_URL = "flashcard-production-f30c.up.railway.app/deck";

// Fetch all decks
export const getAllDecks = async () => {
  try {
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

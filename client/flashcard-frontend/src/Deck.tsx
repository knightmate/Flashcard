import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Define the deck structure
interface Deck {
  title: string;
  cards: string[];
}

export default function Deck() {
  const { id } = useParams<{ id: string }>(); // Extract the deck ID from the URL
  const [deck, setDeck] = useState<Deck | null>(null); // State for the deck
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [newCard, setNewCard] = useState<string>(""); // State for the new card input

  // Fetch the deck details when the component mounts
  useEffect(() => {
    const fetchDeckCards = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/deck/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch deck with ID: ${id}`);
        }
        const data = await response.json();
        setDeck(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeckCards();
  }, [id]);

  // Handle adding a new card
  const handleAddCard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newCard.trim()) {
      return alert("Please enter a card name");
    }

    try {
      const response = await fetch(`http://localhost:3000/deck/${id}/card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newCard }),
      });

      if (!response.ok) {
        throw new Error("Failed to add card");
      }

      const updatedDeck = await response.json();
      setDeck(updatedDeck); // Update deck state with the new card
      setNewCard(""); // Clear the input box
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDelete = async (deckId, cardIndex) => {
    try {
      const response = await fetch(`http://localhost:3000/deck/${deckId}/${cardIndex}/`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete card");
      }
  
      const updatedDeck = await response.json();
      setDeck(updatedDeck.data); // Update the deck state to reflect the removed card
    } catch (error: any) {
      setError(error.message);
    }
  };
  

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  if (!deck) {
    return <h2>No deck found</h2>;
  }

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <h1>{deck.title}</h1>

      {/* List of cards */}
      <ul>
        {deck.cards.map((card, index) => (
          <li key={index}>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            {card}

             <h2 onClick={()=>{handleDelete(id,index)}} style={{padding:'4px'}}>X</h2>
            
            </div>
          </li>
          
        ))}
      </ul>

      {/* Form to add a new card */}
      <form onSubmit={handleAddCard} style={{ marginTop: "2rem" }}>
        <input
          type="text"
          value={newCard}
          onChange={(e) => setNewCard(e.target.value)}
          placeholder="Enter new card name"
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginRight: "0.5rem",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            color: "#fff",
            backgroundColor: "#4caf50",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Card
        </button>
      </form>
    </div>
  );
}

import { useEffect, useState } from "react";
import "./App.css";
import Card from './component/card.tsx';

function App() {
  const [inputValue, setInputValue] = useState(""); // To track input value
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [cards,setCards]=useState([]);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload

    try {
      
      const response = await fetch("http://localhost:3000/deck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: inputValue }),
      });

      setResponseMessage("Card Created"!)

      
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Error occurred while adding data.");
    }
  };

   useEffect(
   ()=>{
    fetchCards();
    
    
   }
    ,[]);

  async function fetchCards(){

    const response = await fetch("http://localhost:3000/deck", {
      method: "GET",     
     });
     const {data}=await response.json();
     setCards(data);

    
   };


  return (
    <div className="container">
      <h1>FlashCard Deck</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter data to submit"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Horizontal Scroll Cards</h1>
      {/* Horizontal Scroll Container */}
      <div style={styles.scrollContainer}>
        {cards.map(({ title }, index) => (
          <div key={index} style={styles.cardWrapper}>
            <Card title={title} />
          </div>
        ))}
      </div>
    </div>
      {responseMessage && <p className="response">{responseMessage}</p>}
    </div>
  );
}

const styles = {
  scrollContainer: {
    maxHeight:'300px',
    overflowX: "auto", // Enable horizontal scroll
    whiteSpace: "nowrap", // Prevent wrapping
    gap: "1rem", // Add space between cards
    padding: "1rem",
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    
  },
  cardWrapper: {
    flex: "0 0 auto", // Prevent shrinking
    width: "300px", // Fixed card width
  },
};


export default App;

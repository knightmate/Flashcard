import { useEffect, useState } from "react";
import "./App.css";
import Card from './component/card.tsx';
import { Link } from "react-router-dom";
import { getAllDecks ,deleteDeck,createDeck} from "./api/Deck.ts";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [cards,setCards]=useState([]);


   useEffect(getAllDecks,[]);

 
   const handleDelete = async (id: string) => {
    try {
       const deletedCard=await deleteDeck(id);
       if(deletedCard){
        setCards(cards.filter((card) => card._id !== deletedCard.id));
       }
 
    } catch (error) {
      console.error("Error while deleting card:", error);
    }
  };

   // Function to handle form submission
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload

    try {
        const createdDeck=await createDeck();
        setCards([createdDeck,...cards])
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Error occurred while adding data.");
    }
  };

  return (
    <div className="container">
      <h1>FlashCard Deck</h1>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
       <div style={styles.scrollContainer}>
        {cards.map(({ title,_id}, index) => (
          <div key={index} style={styles.cardWrapper}>
           <Link to={`/deck/${_id}`}>
            <Card onDelete={()=>handleDelete(_id)} title={title} />
            </Link>
          </div>
        ))}
      </div>
    </div>
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
     
      {responseMessage && <p className="response">{responseMessage}</p>}
    </div>
  );
}

const styles = {
  scrollContainer: {
    display:"flex",
    maxWidth:'500px',
    overflowX: "scroll", // Enable horizontal scroll
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

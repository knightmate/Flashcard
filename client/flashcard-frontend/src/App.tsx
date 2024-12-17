import { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState(""); // To track input value
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

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

     alert(inputValue+"Done!");

      
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Error occurred while adding data.");
    }
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
      {responseMessage && <p className="response">{responseMessage}</p>}
    </div>
  );
}

export default App;

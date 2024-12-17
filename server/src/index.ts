import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {config} from "dotenv";
config();

// import  MongoClient = require('mongodb').MongoClient;
// import  { MongoClient, ServerApiVersion }  from 'mongodb';
import Deck from  "./models/Deck"


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

console.log("process.env",process.env.MY_VARIABLE)
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,      // Ensure new URL parser
    useUnifiedTopology: true,   // Use new Server Discovery engine
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

 
 
const app = express();

app.use(express.json());
app.use(cors('*'))

// Create and save a new deck
app.post("/deck", async (req, res) => {
    try {
       const {title}=req.body;
        // const deckData = createDeck();
        const newDeck = new Deck({
            title: title
        });
        const savedDeck = await newDeck.save();
        res.status(201).json({
            success: true,
            message: "Deck created successfully",
            data: savedDeck
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// GET endpoint to fetch all decks
  

 app.use(express.json()); // Middleware to parse JSON

// DELETE endpoint to delete a specific deck by ID
app.delete("/deck/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the deck with the provided ID
    const result = await Deck.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: `Deck with ID ${id} not found.`,
      });
    }

    // Success response
    res.status(200).json({
      success: true,
      message: `Deck with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting deck:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete deck.",
      error: error.message,
    });
  }
});

app.get("/deck", async (req, res) => {
    try {
      // Fetch all decks from the database
      const decks = await Deck.find().sort({ createdAt: 1 });

  
      // Respond with decks as JSON
      res.status(200).json({
        success: true,
        data: decks,
      });
    } catch (error) {
      console.error("Error fetching decks:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch decks",
        error: error.message,
      });
    }
});

app.get('/', (req, res) => {
    console.log("Hi");
    res.send("Hi, working fine!");
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

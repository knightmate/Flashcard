import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {config} from "dotenv";
config();

// import  MongoClient = require('mongodb').MongoClient;
// import  { MongoClient, ServerApiVersion }  from 'mongodb';
import Deck from  "./models/Deck"
import {getAllDecks,deleteDeckById,createDeck,createDeckCard,deleteDeckCard} from './controllers/index';

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

 

// GET endpoint to fetch all decks
  

app.use(express.json()); // Middleware to parse JSON


//Craete new deck
app.post("/deck", createDeck);

//Create Card for Deck
app.post("/deck/:deckId/card", createDeckCard);
//Delete Deck Card
app.delete("/deck/:deckId/:index", deleteDeckCard);

// Route to fetch all decks
app.get("/deck", getAllDecks);
// Route to delete a deck by ID
app.delete("/deck/:id", deleteDeckById);


app.get('/', (req, res) => {
    console.log("Hi");
    res.send("Hi, working fine!");
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

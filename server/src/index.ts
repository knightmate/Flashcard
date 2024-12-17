import express from 'express';
import mongoose from 'mongoose';
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

console.log("process.env",process.env)
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


app.get('/', (req, res) => {
    console.log("Hi");
    res.send("Hi, working fine!");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

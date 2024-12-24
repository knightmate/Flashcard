import Deck from "../models/Deck"; // Import the Deck model

// Fetch all decks
export const getAllDecks = async (req, res) => {
  try {
    const decks = await Deck.find().sort({ createdAt: 1 }); // Sort by creation date
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
};

export const getDeck = async (req, res) => {
  try {
    const { deckId } = req.params; // Extract the deck ID from URL parameters

    // Find the deck by ID
    const deck = await Deck.findById(deckId);

    // If the deck is not found, return a 404 response
    if (!deck) {
      return res.status(404).json({
        success: false,
        message: `Deck with ID ${deckId} not found.`,
      });
    }

    // Respond with the deck data
    res.status(200).json({
      success: true,
      data: deck,
    });
  } catch (error) {
    console.error("Error fetching deck:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch deck",
      error: error.message,
    });
  }
};


// Delete a deck by ID
export const deleteDeckById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Deck.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: `Deck with ID ${id} not found.`,
      });
    }

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
};

// Create a new deck
export const createDeck = async (req, res) => {
  try {
    const { title } = req.body;

    // Validate request body
    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    // Create and save the new deck
    const newDeck = new Deck({ title });
    const savedDeck = await newDeck.save();

    res.status(201).json({
      success: true,
      message: "Deck created successfully",
      data: savedDeck,
    });
  } catch (error) {
    console.error("Error creating deck:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create deck",
      error: error.message,
    });
  }
};


// Deck Card controller
export const createDeckCard = async (req, res) => {
  try {
    const { deckId} = req.params;
    const { text} = req.body;
    const deck= await Deck.findById(deckId);
    console.log("saving the data",deck,deck.cards);
    deck.cards.push(text);
    await  deck.save();
    res.json(deck);
     
  } catch (error) {
    console.error("Error creating deck:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create deck",
      error: error.message,
    });
  }
};

//Delete Deck Card-Controller
export const deleteDeckCard = async (req, res) => {
  try {
    const { index, deckId } = req.params; // Extract deck ID and card index

    // Find the deck by ID
    const deck = await Deck.findById(deckId);

    // Handle if deck is not found
    if (!deck) {
      return res.status(404).json({
        success: false,
        message: `Deck with ID ${deckId} not found.`,
      });
    }

    // Check if the index is valid
    if (index < 0 || index >= deck.cards.length) {
      return res.status(400).json({
        success: false,
        message: `Invalid card index ${index}.`,
      });
    }

    // Remove the card at the specified index
    deck.cards.splice(index, 1);

    // Save the updated deck
    await deck.save();

    // Respond with the updated deck
    res.status(200).json({
      success: true,
      message: `Card at index ${index} deleted successfully.`,
      data: deck,
    });
  } catch (error) {
    console.error("Error deleting deck card:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete deck card.",
      error: error.message,
    });
  }
};


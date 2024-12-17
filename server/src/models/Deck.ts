import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DeckScheme = new Schema({
  title: String,
});


// Export the model
const DeckModel = mongoose.model("Deck", DeckScheme);
export default DeckModel;

import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: String,
  description: String,
  lat: Number,
  lng: Number,
  image: String
});

export default mongoose.model("Place", placeSchema);


import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  userId: String,
  name: String,
  description: String,
  lat: Number,
  lng: Number,
  image: String,
});

const Place = mongoose.model("Place", placeSchema, 'places');

export default Place;
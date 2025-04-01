import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: String,
  description: String,
  lat: Number,
  lng: Number,
  image: String,
});

const Place = mongoose.model("Place", placeSchema, 'places');

export default Place;
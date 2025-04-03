import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import placeRoutes from "./routes/placeRoutes.js";

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/places", placeRoutes);

export default app;
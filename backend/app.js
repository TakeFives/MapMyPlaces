import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import placeRoutes from "./routes/placeRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());

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

app.use("/api/users", userRoutes);

export default app;
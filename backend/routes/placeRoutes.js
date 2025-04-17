import express from "express";

import placeController from "../controllers/placeController.js";
import upload from "../middlewares/uploadFileImageMiddleware.js";

const router = express.Router();

router.get("/", placeController.getAllPlaces);

router.post("/", upload.single("placeImage"), placeController.addPlace);

router.get("/user/:userId", placeController.getAllPlacesByUserId);

router.delete("/:id", placeController.deletePlace);

export default router;

import Place from "../schemas/placeSchema.js";
import dotenv from "dotenv";
import AWS from 'aws-sdk';
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const placeModel = {
  getAll: async function () {
    try {
      const places = await Place.find(); 
      return places;
    } catch (err) {
      throw new Error("Error fetching places from the database");
    }
  },

  getById: async function (id) {
    try {
      const place = await Place.findById(id); 
      return place;
    } catch (err) {
      throw new Error("Error fetching place by ID");
    }
  },

  add: async function (placeData) {
    try {
      const newPlace = new Place({
        name: placeData.placeName,
        description: placeData.placeDescription,
        lat: placeData.lat,
        lng: placeData.lng,
        image: placeData.image
      }); 
      await newPlace.save(); 
      return newPlace;
    } catch (err) {
      throw new Error("Error adding new place");
    }
  },

  addFileImage: async function (file) {
    console.log('file', file)
    try {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `places/${Date.now()}-${file.originalname}`, 
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const uploadResult = await s3.upload(params).promise();
      return uploadResult.Location; 
    } catch (err) {
      throw new Error("Image upload failed");
    }
  },

  deleteById: async function (id) {
    try {
      const place = await Place.findByIdAndDelete(id); 
      return place;
    } catch (err) {
      throw new Error("Error deleting place by ID");
    }
  },

};

export default placeModel;

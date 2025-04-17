import Place from "../schemas/placeSchema.js";
import dotenv from "dotenv";
import AWS from "aws-sdk";
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const placeModel = {
  getAll: async function () {
    return await Place.find();
  },

  getById: async function (id) {
    return await Place.findById(id);
  },

  getAllByUserId: async function (userId) {
    return await Place.find({ userId: userId });
  },

  add: async function (placeData) {
    const newPlace = new Place({
      userId: placeData.userId,
      name: placeData.placeName,
      description: placeData.placeDescription,
      lat: placeData.lat,
      lng: placeData.lng,
      image: placeData.image,
    });
    await newPlace.save();
    return newPlace;
  },

  addFileImage: async function (file) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `places/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location;
  },

  deleteById: async function (id) {
    return await Place.findByIdAndDelete(id);
  },
};

export default placeModel;

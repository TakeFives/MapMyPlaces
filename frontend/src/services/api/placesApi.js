import axios from "axios";

const API_URL = "http://localhost:8080/api/places"; 


export const getPlaces = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data.places);
    return response.data.places; 
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
};


export const addPlace = async (formData) => {
  console.log('form data', formData)
  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding place:", error);
    throw error;
  }
};


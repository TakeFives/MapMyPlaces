import placeModel from "../models/placeModel.js";

const placeController = {
  getAllPlaces: async function (req, res) {
    try {
      const places = await placeModel.getAll();
      res.json({
        places: places,
        message: 'ok'
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addPlace: async function (req, res) {
    try {
        const placeData = req.body;
  
        if (req.file) {
          const imageUrl = await placeModel.addFileImage(req.file);
          placeData.image = imageUrl;
        }
  
        const newPlace = await placeModel.add(placeData);
        res.status(201).json(newPlace);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  },

  deletePlace: async function (req, res) {
    const { id } = req.params;

    try {
      const place = await placeModel.deleteById(id); 
      if (!place) {
        return res.status(404).json({ error: `No place found with ID ${id}` });
      }

      res.json({ message: `Place with ID ${id} has been deleted` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default placeController;

import { useState, useEffect, useRef } from "react";
import FormMap from "../templates/FormMap";
import { useGoogleMapsApi } from "../../services/api/googleMapsApi.js";
import { formValidation } from "../../services/validators/formValidation.js";
import { addPlace } from "../../services/api/placesApi.js";

function Form() {
  // state
  const { isLoaded } = useGoogleMapsApi();
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  console.log('formRef', formRef)

  const [formData, setFormData] = useState({
    placeName: null,
    placePreferedName: "",
    placeDescription: "",
    lat: null,
    lng: null,
    placeImage: null,
  });

  const [errors, setErrors] = useState({
    placeName: "",
    placePreferedName: "",
    placeDescription: "",
    placeImage: "",
  });

  // hooks
  useEffect(() => {
    if (!isLoaded || !window.google || !formRef.current) return;

    const inputElement = formRef.current.elements.placeName;
    if (!inputElement) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputElement,
      {
        types: ["geocode", "establishment"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      setFormData((prev) => ({
        ...prev,
        placeName: place.name,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }));
    });

    return () => autocomplete.unbindAll();
  }, [isLoaded]);

  
  //handlers
  function handleInputChange(e) {
    const { name, value, type, files } = e.target;
  
    let updatedFormData = { ...formData };
  
    if (type === "file") {
      updatedFormData[name] = files[0];
    } else {
      updatedFormData[name] = value;
    }
  
    setFormData(updatedFormData);
  
    const isValid = formValidation(updatedFormData, setErrors);
    setIsFormValid(isValid);
  }
  

  async function handleSubmit(e) {
    e.preventDefault();

    if(!isFormValid) return
    
    console.log("New place to add fd", formData);
    try {
      const newPlace = await addPlace(formData);
      console.log("Added place", newPlace);

    if (formRef.current) {
      formRef.current.reset();
    }
  
      setFormData({
        placeName: "",
        placePreferedName: "",
        placeDescription: "",
        lat: null,
        lng: null,
        placeImage: null,
      });
  
      setErrors({
        placeName: "",
        placePreferedName: "",
        placeDescription: "",
        placeImage: "",
      });
    } catch (error) {
      console.error("Error adding place:", error);
    }
  }

  return (
    <>
      <section id="form" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Add your place</h2>
          <div className="map-container">
            <form onSubmit={handleSubmit} ref={formRef}> {/* useRef */}
              <div className="form-group">
                <label htmlFor="placeName" className="form-group__label">
                  Place Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="placeName"
                  placeholder="Enter place name"
                />
                {errors.placeName && (
                  <span className="error">{errors.placeName}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="map" className="form-group__label">
                  Map
                </label>
                <div id="map">
                  <FormMap place={formData} isLoaded={isLoaded} />
                </div>
              </div>
              <div className="form-group">
                <label
                  htmlFor="placePreferedName"
                  className="form-group__label"
                >
                  Preferred Name
                </label>
                <input
                  type="text"
                  id="placePreferedName"
                  name="placePreferedName"
                  placeholder="Your preferred name for this place"
                  value={formData.placePreferredName}
                  onChange={handleInputChange}
                />
                {errors.placePreferedName && (
                  <span className="error">{errors.placePreferedName}</span>
                )}

                <label htmlFor="placeDescription" className="form-group__label">
                  Description
                </label>
                <textarea
                  id="placeDescription"
                  name="placeDescription"
                  placeholder="Tell us about the place"
                  onChange={handleInputChange}
                ></textarea>
                {errors.placeDescription && (
                  <span className="error">{errors.placeDescription}</span>
                )}

                <label htmlFor="placeImage" className="form-group__label">
                  Your image of the place
                </label>
                <input
                  type="file"
                  name="placeImage"
                  id="placeImage"
                  onChange={handleInputChange}
                />
                {errors.placeImage && (
                  <span className="error">{errors.placeImage}</span>
                )}
              </div>
              <button type="submit" className="btn btn-primary" disabled={!isFormValid}>
                Add this place
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Form;

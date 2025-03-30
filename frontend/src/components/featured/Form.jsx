import { useState, useEffect, useRef } from "react";
import FormMap from "../templates/FormMap";
import { useGoogleMapsApi } from "../../services/api/googleMapsApi.js";
import { formValidation } from "../../services/validators/formValidation.js";

function Form() {
  // state
  const { isLoaded } = useGoogleMapsApi();
  const inputRef = useRef(null);

  const [formData, setFormData] = useState({
    placeName: null,
    placePreferedName: "",
    placeDescription: "",
    lat: null,
    lng: null,
    placeImage: null,
  });

  console.log("formData", formData);

  const [errors, setErrors] = useState({
    placeName: "",
    placePreferedName: "",
    placeDescription: "",
    placeImage: "",
  });

  // hooks
  useEffect(() => {
    if (!isLoaded || !window.google || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
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

    // If it's a file input, store the file
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData();

    fd.append("placeName", formData.placeName);
    fd.append("placePreferedName", formData.placePreferedName);
    fd.append("placeDescription", formData.placeDescription);
    fd.append("lat", formData.lat);
    fd.append("lng", formData.lng);

    // Append the image file
    if (formData.placeImage) {
      fd.append("placeImage", formData.placeImage);
    }

    console.log(fd);

    // Assuming formValidation is used for validation
    formValidation(fd, setErrors);
  }

  return (
    <>
      <section id="form" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Add your place</h2>
          <div className="map-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="placeName" className="form-group__label">
                  Place Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="placeName"
                  placeholder="Enter place name"
                  ref={inputRef}
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
              <button type="submit" className="btn btn-primary">
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

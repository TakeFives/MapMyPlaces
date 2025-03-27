import { useState, useEffect, useRef } from "react";
import FormMap from "../templates/FormMap";
import { useGoogleMapsApi } from "../../services/api/googleMapsApi.js";

function Form() {
  const { isLoaded } = useGoogleMapsApi();
  const inputRef = useRef(null);

  const [formData, setFormData] = useState({
    placeName: null,
    placePreferedName: "",
    placeDescription: "",
    lat: null,
    lng: null,
  });

  useEffect(() => {
    if (!isLoaded || !window.google || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["geocode"],
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

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData)
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
                <label htmlFor="placePreferedName" className="form-group__label">
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
                <label htmlFor="placeDescription" className="form-group__label">
                  Description
                </label>
                <textarea
                  id="placeDescription"
                  name="placeDescription"
                  placeholder="Tell us about the place"
                  onChange={handleInputChange}
                ></textarea>
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

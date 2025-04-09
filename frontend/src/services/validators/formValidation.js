export function formValidation(formData, setErrors, touchedFields) {
  const newErrors = { placeName: "", placePreferedName: "", placeDescription: "", placeImage: "" };
  let isValid = true;

  if (touchedFields.placeName && !formData.placeName) {
    newErrors.placeName = "Place name is required.";
    isValid = false;
  }

  if (touchedFields.placePreferedName && !formData.placePreferedName) {
    newErrors.placePreferedName = "Preferred name is required.";
    isValid = false;
  }

  if (touchedFields.placeDescription && !formData.placeDescription) {
    newErrors.placeDescription = "Description is required.";
    isValid = false;
  }

  if (touchedFields.placeImage && !formData.placeImage) {
    newErrors.placeImage = "Image is required.";
    isValid = false;
  }

  setErrors((prev) => ({ ...prev, ...newErrors }));
  
  return isValid;
}

export function formValidation(formData, setErrors) {
  const newErrors = { placeName: "", placePreferedName: "", placeDescription: "", placeImage: "" };
  let isValid = true;

  if (!formData.placeName) {
    newErrors.placeName = "Place name is required.";
    isValid = false;
  }

  if (!formData.placePreferedName) {
    newErrors.placePreferedName = "Preferred name is required.";
    isValid = false;
  }

  if (!formData.placeDescription) {
    newErrors.placeDescription = "Description is required.";
    isValid = false;
  }

  if (!formData.placeImage) {
    newErrors.placeImage = "Image is required.";
    isValid = false;
  }

  setErrors(newErrors);  // Update the error messages
  return isValid;
}

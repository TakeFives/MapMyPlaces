export function formValidation(formData, setErrors){
    console.log(formData)

    const newErrors = { placeName: "", placePreferedName: "", placeDescription: "" };
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
      newErrors.placeDescription = "Image is required.";
      isValid = false;
    }

    setErrors(newErrors); 
    return isValid;
}
import React, { useEffect, useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

function FormMap({ place, isLoaded }) {
  const containerStyle = {
    width: "100%",
    height: "350px",
  };
  const [coordinates, setCoordinates] = useState({
    lat: 51.03669152931135,
    lng: -114.09744803725195,
  }); // 51.03669152931135, -114.09744803725195 calgary

  const mapCenter = coordinates;

  useEffect(() => {
    if (!place.lat || !place.lng) return;

    setCoordinates({
      lat: place.lat,
      lng: place.lng,
    });
  }, [place.lat, place.lng]);

  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={12}
      >
        {coordinates && (
          <>
            <Marker
              position={{ lat: coordinates.lat, lng: coordinates.lng }}
              title={coordinates.name}
            ></Marker>
            {place.preferedName && (
              <InfoWindow
                position={{ lat: coordinates.lat, lng: coordinates.lng }}
                options={{ pixelOffset: new window.google.maps.Size(0, -50) }}
              >
                <div>
                  {`The place you selected is: ${place.preferedName}`}
                </div>
              </InfoWindow>
            )}
          </>
        )}
      </GoogleMap>
    )
  );
}

export default FormMap;

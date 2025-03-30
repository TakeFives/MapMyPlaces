import React from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { useGoogleMapsApi } from "../../services/api/googleMapsApi.js";

function SingleMap({ place }) {
  const containerStyle = {
    width: "100%",
    height: "450px",
  };

  // Load Google Maps API
  const { isLoaded } = useGoogleMapsApi();

  const mapCenter = { lat: place.lat, lng: place.lng };

  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={12}
      >
        <Marker
          key={place.id}
          position={{ lat: place.lat, lng: place.lng }}
          title={place.name}
        ></Marker>

        <InfoWindow
          position={{ lat: place.lat, lng: place.lng }}
          options={{ pixelOffset: new window.google.maps.Size(0, -50) }}
        >
          <div
            style={{
              background: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              fontSize: "12px",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
              whiteSpace: "nowrap",
            }}
          >
            <img src={place.image} width="75" height="75" /> <br /> {place.name}
          </div>
        </InfoWindow>
      </GoogleMap>
    )
  );
}

export default SingleMap;

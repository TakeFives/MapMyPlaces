import React, { useState, useEffect } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { useGoogleMapsApi } from "../../services/api/googleMapsApi.js";
// import { locations } from "../../data/data.json";
import { getPlaces } from "../../services/api/placesApi.js";

function MainMap() {
  // const data = locations;
  const [data, setData] = useState([]);

  const containerStyle = {
    width: "100%",
    height: "600px",
  };

  const [map, setMap] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Load Google Maps API
  const { isLoaded } = useGoogleMapsApi();

  const calculateBounds = () => {
    const bounds = new window.google.maps.LatLngBounds();
    data.forEach((place) => {
      bounds.extend(new window.google.maps.LatLng(place.lat, place.lng));
    });
    return bounds;
  };

   useEffect(() => {
      async function fetchPlaces() {
        try {
          const data = await getPlaces();
          setData(data);
        } catch (error) {
          console.error("Error loading places:", error);
        }
      }
      fetchPlaces();
    }, []);

  useEffect(() => {
    if (map && data.length > 0) {
      const bounds = calculateBounds();
      map.fitBounds(bounds);
    }
  }, [map, data]);

  const handleLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  return (
    isLoaded && (
      <GoogleMap mapContainerStyle={containerStyle} onLoad={handleLoad}>
        {/* Add markers */}
        {data.map((place) => (
          <Marker
            key={place._id}
            position={{ lat: place.lat, lng: place.lng }}
            title={place.name}
            onClick={() => setSelectedPlace(place)}
          ></Marker>
        ))}
        {/* Show tooltip-like InfoWindow near the marker */}
        {selectedPlace && (
          <InfoWindow
            position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
            onCloseClick={() => setSelectedPlace(null)}
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
              <img src={selectedPlace.image} width="75" height="75" /> <br />{" "}
              {selectedPlace.name}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    )
  );
}

export default MainMap;

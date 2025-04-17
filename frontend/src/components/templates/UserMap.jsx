import React, { useState, useEffect } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { useGoogleMapsApi } from "../../services/api/googleMapsApi.js";
import { getUserPlaces } from "../../services/api/placesApi.js";
import { useAuth } from "../../hooks/useAuth";

function UserMap() {
  const { user } = useAuth();
  const [data, setData] = useState([]);

  const containerStyle = {
    width: "100%",
    height: "600px",
  };

  const [map, setMap] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

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
        const data = await getUserPlaces(user.id);
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
  }, [map, data, calculateBounds]);

  const handleLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  return user ? (
    isLoaded && (
      <GoogleMap mapContainerStyle={containerStyle} onLoad={handleLoad}>
        {/* Add markers */}
        {data.map((place) => (
          <Marker
            key={place._id}
            position={{ lat: place.lat, lng: place.lng }}
            title={place.name}
            icon={{
                path:
                  "M24 4C19 -2 10 -1 10 6C10 10 24 22 24 22C24 22 38 10 38 6C38 -1 29 -2 24 4Z",
                fillColor: "#e25555",
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 1.2, // bigger size here!
                anchor: new window.google.maps.Point(24, 22),
              }}
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
  ) : (
    <div className="text-center">
      <h2>Please log in to view the map</h2>
      <p>Map is only available for registered users.</p>
      <p>Log in to see your personalized map with all your places.</p>
    </div>
  );
}

export default UserMap;

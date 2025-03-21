import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import data from "../../data/data.json";

function Map() {
  // Default Map Position
  const position = [51.0447, -114.0719]; // Calgary, Alberta
  const [places, setPlaces] = useState(data.locations);

  // set map to center view on all pins
  function FitBounds({ places }) {
    const map = useMap();
    useEffect(() => {
      if (places.length === 0) return;
      const bounds = L.latLngBounds(places.map((place) => place.coordinates));
      map.fitBounds(bounds, { padding: [50, 50] });
    }, [places, map]);
    return null;
  }

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        console.log("e.latlng", e.latlng);
        const newPlace = {
          id: Date.now(),
          coordinates: e.latlng,
          image: "",
        };
        setPlaces([...places, newPlace]);
      },
    });
    return null;
  }
  return (
    <>
      <section id="map" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Explore the Map</h2>
          <div className="map-container">
            <MapContainer
              center={position}
              zoom={13}
              className="leaflet-container"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <FitBounds places={places} />

              <MapClickHandler />

              {places.map((place) => (
                <Marker key={place.id} position={place.coordinates}>
                  <Popup>
                    <b>{place.name}</b>
                    <p>{place.description}</p>
                    <img src={place.image} alt={place.name} width="100px" />
                  </Popup>
                </Marker>
              ))}
              {/* <Marker position={position}>
                        <Popup>My favorite place!</Popup>
                      </Marker> */}
            </MapContainer>
          </div>
        </div>
      </section>
    </>
  );
}

export default Map;

import React, { useState } from "react";
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import data from "./data/data.json";

function App() {
  // Default Map Position
  const position = [51.0447, -114.0719]; // Calgary, Alberta
  const places = data.locations;

  const [activeItemMapId, setActiveItemMapId] = useState(null);

  const toggleShowMap = (id) => {
    setActiveItemMapId((prevId) => (prevId === id ? null : id));
  };
  return (
    <>
      {/* Header Section */}
      <header className="fixed-top bg-transparent">
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand fw-bold" href="/">
              MapMyPlaces
            </a>

            <button
              className="navbar-toggler border-0 burger-menu"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="burger-menu__first-line"></span>
              <span className="burger-menu__second-line"></span>
              <span className="burger-menu__third-line"></span>
            </button>

            <div
              className="collapse navbar-collapse flex-lg-grow-0"
              id="navbarNav"
            >
              <ul className="navbar-nav ms-auto mt-4 mb-4 mt-lg-0 mb-lg-0 text-center">
                <li className="nav-item">
                  <a className="nav-link" href="#hero">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#map">
                    MyMap
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#places">
                    MyPlaces
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="hero text-center text-white d-flex align-items-center justify-content-center"
      >
        <div className="container w-75">
          <h1 className="fw-bold">Discover & Save Your Favorite Places</h1>
          <p className="text-white my-4">
            Map your places using address data or pin it to save
          </p>
          <a
            href="#map"
            aria-label="Go to Map section"
            className="btn btn-primary"
          >
            Check out the map
          </a>
        </div>
      </section>

      {/* Map Section */}
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
              <Marker position={position}>
                <Popup>My favorite place!</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </section>

      {/* Places List Section */}
      <section id="places" className="bg-light places-container py-5">
        <div className="container">
          <h2 className="text-center mb-5">Saved Places</h2>

          <div className="flex cards-container pt-4 pb-4">
            {places.map((item, index) => {
              return (
                <div
                  className={`card flex-md-row flex-column-reverse ${
                    index % 2 === 0 ? "" : "flex-md-row-reverse"
                  }`}
                  key={item.id}
                >
                  <div className="card__preview container-fliud">
                    {activeItemMapId === item.id ? (
                      <div className="card__map">
                        <MapContainer
                          center={item.coordinates} // Use item's coordinates
                          zoom={13}
                          className="leaflet-container"
                        >
                          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                          <Marker position={item.coordinates}>
                            <Popup>{item.name} Location</Popup>
                          </Marker>
                        </MapContainer>
                      </div>
                    ) : (
                      <div className="card__image">
                        <img src={item.image} alt={item.name} />
                      </div>
                    )}
                  </div>

                  <div className="card__description">
                    <h3 className="card__title">{item.name}</h3>
                    <p className="card__text">{item.description}</p>
                    <button
                      type="button"
                      className="btn card__location-btn"
                      onClick={() => toggleShowMap(item.id)}
                    >
                      View map {item.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-dark text-center py-3">
        <p className="copyright">
          &copy; 2025 MapMyPlaces. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default App;

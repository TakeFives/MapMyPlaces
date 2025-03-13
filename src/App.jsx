import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function App() {

  // Default Map Position
  const position = [51.0447, -114.0719]; // Calgary, Alberta


  return (
    <>
      {/* Header Section */}
      <header className="fixed-top bg-transparent">
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
          <div className="container-fluid">
            
            {/* Logo on the Left */}
            <a className="navbar-brand text-white fw-bold" href="/">
              MapMyPlaces
            </a>

            {/* Toggle Button on the Right (for Mobile) */}
            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Collapsible Menu (Opens Below on Mobile) */}
            <div className="collapse navbar-collapse flex-lg-grow-0" id="navbarNav">
              <ul className="navbar-nav ms-auto mt-3 mt-lg-0 text-center">
                <li className="nav-item">
                  <a className="nav-link text-white" href="#hero">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#map">MyMap</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#places">MyPlaces</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#contact">Contact</a>
                </li>
              </ul>
            </div>

          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero text-center text-white d-flex align-items-center justify-content-center" style={{ height: "100vh", paddingTop: "80px" }}>
        <div className="container">
          <h1 className="fw-bold">Discover & Save Your Favorite Places</h1>
          <p>Map your places using address data or pin it to save</p>
          <a href="#map">Check out the map</a>
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
      <section id="places" className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Saved Places</h2>
          <ul className="list-group">
            <li className="list-group-item">Place 1 </li>
            <li className="list-group-item">Place 2 </li>
            <li className="list-group-item">Place 3 </li>
          </ul>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-3">
        <p>&copy; 2025 MapMyPlaces. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;

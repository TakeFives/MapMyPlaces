import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function App() {
  // Default Map Position
  const position = [51.0447, -114.0719]; // Calgary, Alberta

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
              class="navbar-toggler border-0 burger-menu"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="burger-menu__first-line"></span>
              <span class="burger-menu__second-line"></span>
              <span class="burger-menu__third-line"></span>
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
      <section id="places" className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Saved Places</h2>

          <div className="flex cards-container">
            {/* Card 1 */}
            <div class="card bg-dark text-white">
              <img
                class="card-img"
                src="src/assets/images/featured-image-1.png"
                alt="Card image"
              />
              <div class="card-img-overlay">
                <h3 class="card-title text-white">Card title</h3>
                <p class="card-text text-white">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <span>Location</span>
              </div>
            </div>

            {/* Card 2 */}
            <div class="card bg-dark text-white">
              <img
                class="card-img"
                src="src/assets/images/featured-image-2.png"
                alt="Card image"
              />
              <div class="card-img-overlay">
                <h3 class="card-title text-white">Card title</h3>
                <p class="card-text text-white">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <span>Location</span>
              </div>
            </div>

            {/* Card 3 */}
            <div class="card bg-dark text-white">
              <img
                class="card-img"
                src="src/assets/images/featured-image-3.png"
                alt="Card image"
              />
              <div class="card-img-overlay">
                <h3 class="card-title text-white">Card title</h3>
                <p class="card-text text-white">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <span>Location</span>
              </div>
            </div>
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

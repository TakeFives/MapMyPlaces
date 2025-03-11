import './App.css'

function App() {

  return (
    <>
    {/* Header Section */}
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">MapMyPlaces</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#hero">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#map">MyMap</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#places">MyPlaces</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  
    {/* Hero Section */}
    <section id="hero" className="hero text-center py-5 text-white">
      <div className="container">
        <h1>Discover & Save Your Favorite Places</h1>
      </div>
    </section>
  
    {/* Map Section */}
    <section id="map" className="py-5">
      <div className="container">
        <h2 className="text-center mb-4">Explore the Map</h2>
        <div className="map-container">
          {/* Map Component will be embedded here */}
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
  
  )
}

export default App

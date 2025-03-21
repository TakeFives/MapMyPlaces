import React from "react";

function Header() {
  return (
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
  );
}

export default Header;

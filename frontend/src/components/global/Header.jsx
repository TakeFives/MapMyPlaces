import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContextInstance";
import { logout } from "../../services/api/authApi";
import { Link } from "react-router";

function Header() {
  const { user, logoutUserContext } = useContext(AuthContext);

  function handleLogout(){
    logout()
      .then(() => {
        window.location.href = "/";
        logoutUserContext();
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  }

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
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              {user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-map">MyMap</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-places">MyPlaces</Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
              {!user ? (
                <li className="nav-item">
                  <a className="nav-link" href="/auth">
                    Login
                  </a>
                </li>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => handleLogout()}>
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

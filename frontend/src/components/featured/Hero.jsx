import React, { useContext } from "react";
import { useLocation } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContextInstance.js";

function Hero() {
  const { user } = useContext(AuthContext);
  const {pathname} = useLocation();

  return (
    <>
      <section
        id="hero"
        className="hero text-center text-white d-flex align-items-center justify-content-center"
      >
        <div className="container w-75">
          <h1 className="fw-bold">
            {pathname === "/auth" ? "Authentication" : "Discover & Save Your Favorite Places"}
          </h1>
          {pathname !== "/auth" && (
            <>
              <p className="text-white my-4">
                Map your places using address data or pin it to save
              </p>
              <a
                href={user ? "/my-map" : "/auth"}
                aria-label="Go to Map section"
                className="btn btn-primary hero__cta"
              >
                {user ? "Check out the map" : "Login to get started"}
              </a>
            </>
          )}
        </div>
      </section>
    </>
  );

}

export default Hero;

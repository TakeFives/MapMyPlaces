import React from "react";
import { useAuth } from "../../hooks/useAuth";

function Hero() {
  const { user } = useAuth();

  return (
    <>
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
            href={user ? "/my-map" : "/auth"}
            aria-label="Go to Map section"
            className="btn btn-primary hero__cta"
          >
            {user ? "Check out the map" : "Login to get started"}
          </a>
        </div>
      </section>
    </>
  );
}

export default Hero;

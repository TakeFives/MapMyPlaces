import React from "react";

function Hero() {
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
            href="#map"
            aria-label="Go to Map section"
            className="btn btn-primary"
          >
            Check out the map
          </a>
        </div>
      </section>
    </>
  );
}

export default Hero;

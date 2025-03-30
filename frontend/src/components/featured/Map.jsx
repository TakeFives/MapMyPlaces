import React from 'react';
import MainMap from '../templates/MainMap';
function Map() {
 
  return (
    <>
      <section id="map" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Explore the Map</h2>
          <div className="map-container">
            <MainMap />
          </div>
        </div>
      </section>
    </>
  );
}

export default Map;

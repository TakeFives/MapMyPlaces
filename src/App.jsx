import React from "react";
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import Header from "./components/global/Header";
import Hero from "./components/featured/Hero";
import Map from "./components/featured/Map";
import Places from "./components/featured/Places";
import Footer from "./components/global/Footer";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Map />
      <Places />
      <Footer />
    </>
  );
}

export default App;

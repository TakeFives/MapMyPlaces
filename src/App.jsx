import React from "react";

import Header from "./components/global/Header";
import Hero from "./components/featured/Hero";
import Map from "./components/featured/Map";
import Places from "./components/featured/Places";
import Footer from "./components/global/Footer";

import "./App.css";

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

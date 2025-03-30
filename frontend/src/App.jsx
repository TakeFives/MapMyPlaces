import React from "react";

import Header from "./components/global/Header";
import Hero from "./components/featured/Hero";
import Map from "./components/featured/Map";
import Places from "./components/featured/Places";
import Form from "./components/featured/Form";
import Footer from "./components/global/Footer";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Map />
      <Places />
      <Form />
      <Footer />
    </>
  );
}

export default App;

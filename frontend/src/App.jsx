import React from "react";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

import Header from "./components/global/Header";
import Hero from "./components/featured/Hero";
import Footer from "./components/global/Footer";

import Home from "./components/pages/Home";
import MyMap from "./components/pages/MyMap";
import MyPlaces from "./components/pages/MyPlaces";
import Contact from "./components/pages/Contact";
import Auth from "./components/pages/Auth";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/my-map"
          element={
            <ProtectedRoute>
              <MyMap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-places"
          element={
            <ProtectedRoute>
              <MyPlaces />
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

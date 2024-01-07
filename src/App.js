import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardCreator from "./components/CardCreator";
import CardGallery from "./components/CardGallery"; // Ensure this component exists
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CardCreator />} />
          <Route path="/gallery" element={<CardGallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

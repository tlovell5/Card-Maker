import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardCreator from "./components/CardCreator";
import CardGallery from "./components/CardGallery"; // Ensure this component exists
import Sidebar from "./components/Sidebar"; // Import the sidebar component
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<CardCreator />} />
            <Route path="/gallery" element={<CardGallery />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

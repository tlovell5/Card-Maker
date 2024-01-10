// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button style={{ margin: "10px" }}>Card Creator</Button>
      </Link>
      <Link to="/gallery" style={{ textDecoration: "none" }}>
        <Button style={{ margin: "10px" }}>Card Gallery</Button>
      </Link>
      {/* Add more navigation links/buttons as needed */}
    </div>
  );
}

export default Sidebar;

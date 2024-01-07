import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import itemCardTemplateImage from "../assets/ItemCardTemplate.png"; // Adjust path as necessary
import "./ItemCardTemplate.css";

function ItemCardTemplate({ title, description, imageUrl }) {
  const [descriptionTop, setDescriptionTop] = useState("73%");

  useEffect(() => {
    // Gradually adjust 'top' based on the length of the description
    const adjustTopBasedOnLength = (length) => {
      const maxLength = 100; // Adjust this for finer control
      const minTop = 66;
      const maxTop = 73;
      const lengthPercentage = Math.min(length / maxLength, 1);
      return maxTop - (maxTop - minTop) * lengthPercentage + "%";
    };

    setDescriptionTop(adjustTopBasedOnLength(description.length));
  }, [description]);

  return (
    <Card className="card" style={{ position: "relative" }}>
      <div className="card-image-container">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Background"
            className="card-background-image"
          />
        )}
        <img
          src={itemCardTemplateImage}
          alt="Item Card"
          className="card-overlay-image"
        />
        <Typography
          style={{
            fontFamily: "'IM Fell English SC', serif",
            textAlign: "center",
            position: "absolute",
            top: 6,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            fontSize: "20px",
            color: "black",
            width: "100%",
            padding: "10px 0",
          }}
          variant="h6"
        >
          Item
        </Typography>
      </div>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="card-title"
          style={{
            textAlign: "center",
            fontSize: "19px",
            fontFamily: "'IM Fell English SC', serif",
            top: "59.75%",
            left: "-4%",
            position: "absolute",
            zIndex: 3,
            width: "100%",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="card-description"
          style={{
            fontFamily: "'IM Fell English SC', serif",
            textAlign: "center",
            position: "absolute",
            top: descriptionTop,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            fontSize: "17px",
            color: "black",
            width: "calc(80% - 20px)",
            padding: "10px 0",
            overflowWrap: "break-word",
            maxHeight: "100px",
            overflow: "hidden",
            lineHeight: "1",
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ItemCardTemplate;

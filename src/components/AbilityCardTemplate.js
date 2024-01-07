import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";

function AbilityCardTemplate({ title, description, imageUrl }) {
  return (
    <Card className="card">
      {imageUrl && (
        <CardMedia
          component="img"
          className="card-media"
          image={imageUrl}
          alt={title}
        />
      )}
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="card-title"
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="card-description"
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default AbilityCardTemplate;

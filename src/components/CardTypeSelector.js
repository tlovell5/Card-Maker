import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function CardTypeSelector({ onCardTypeChange }) {
  const [cardType, setCardType] = useState("");

  const handleCardTypeChange = (event) => {
    setCardType(event.target.value);
    if (onCardTypeChange) {
      onCardTypeChange(event.target.value);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="card-type-select-label">Card Type</InputLabel>
      <Select
        labelId="card-type-select-label"
        id="card-type-select"
        value={cardType}
        label="Card Type"
        onChange={handleCardTypeChange}
      >
        <MenuItem value="Item">Item</MenuItem>
        <MenuItem value="Ability">Ability</MenuItem>
        {/* Add more menu items for other card types */}
      </Select>
    </FormControl>
  );
}

export default CardTypeSelector;

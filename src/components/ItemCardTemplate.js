import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import itemCardTemplateImage from "../assets/ItemCardTemplate.png";
import "./ItemCardTemplate.css";

// Import your icons
import fireIcon from "../assets/Fire.png";
import damageIcon from "../assets/Damage.png";
import healingIcon from "../assets/Healing.png";
import shieldingIcon from "../assets/Shielding.png";
import iceIcon from "../assets/Ice.png";
import natureIcon from "../assets/Nature.png";
import arcaneIcon from "../assets/Arcane.png";
import stealthIcon from "../assets/Stealth.png";
import buffIcon from "../assets/Buff.png";
import debuffIcon from "../assets/Debuff.png";
import lightningIcon from "../assets/Lightning.png";
import summoningIcon from "../assets/Summoning.png";
import poisonIcon from "../assets/Poison.png";
import enchantmentIcon from "../assets/Enchantment.png";
import terrainIcon from "../assets/Terrain.png";
import curseIcon from "../assets/Curse.png";
import illusionIcon from "../assets/Illusion.png";
import mindControlIcon from "../assets/MindControl.png";
import timeIcon from "../assets/Time.png";
import darknessIcon from "../assets/Darkness.png";

// Mapping from icon names to the imported images
const iconMapping = {
  Fire: fireIcon,
  Damage: damageIcon,
  Healing: healingIcon,
  Shielding: shieldingIcon,
  Ice: iceIcon,
  Nature: natureIcon,
  Arcane: arcaneIcon,
  Stealth: stealthIcon,
  Buff: buffIcon,
  Debuff: debuffIcon,
  Lightning: lightningIcon,
  Summoning: summoningIcon,
  Poison: poisonIcon,
  Enchantment: enchantmentIcon,
  Terrain: terrainIcon,
  Curse: curseIcon,
  Illusion: illusionIcon,
  MindControl: mindControlIcon,
  Time: timeIcon,
  Darkness: darknessIcon,
};

function ItemCardTemplate({ title, description, imageUrl, selectedIcons }) {
  const [descriptionTop, setDescriptionTop] = useState("73%");
  console.log({ title, description, imageUrl, selectedIcons }); // Debugging

  useEffect(() => {
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
          Ability
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
        <div
          style={{
            position: "absolute",
            bottom: 18,
            right: 28,
            display: "flex",
            zIndex: 5,
          }}
        >
          {selectedIcons &&
            selectedIcons.map((iconName, index) => (
              <img
                key={index}
                src={iconMapping[iconName]} // Use the mapped icon
                alt={iconName}
                style={{
                  width: "19px",
                  height: "19px",
                  marginLeft: index > 0 ? "-1px" : "0",
                }}
              />
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ItemCardTemplate;

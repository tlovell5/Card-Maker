import React, { useState, useCallback, useRef } from "react";
import { Select, MenuItem, Button } from "@mui/material";
import html2canvas from "html2canvas";
import { supabase } from "./supabaseClient"; // Adjust this path
import CardTypeSelector from "./CardTypeSelector";
import ItemCardTemplate from "./ItemCardTemplate";
import AbilityCardTemplate from "./AbilityCardTemplate";
import ReactCrop from "react-image-crop";
import { Link } from "react-router-dom";
import "react-image-crop/dist/ReactCrop.css";

const options = [
  "Fire",
  "Damage",
  "Healing",
  "Shielding",
  "Ice",
  "Nature",
  "Arcane",
  "Stealth",
  "Buff",
  "Debuff",
  "Lightning",
  "Summoning",
  "Poison",
  "Enchantment",
  "Terrain",
  "Curse",
  "Illusion",
  "Mind Control",
  "Time",
  "Darkness",
];

function CardCreator() {
  const [selectedCardType, setSelectedCardType] = useState("");
  const [cardDetails, setCardDetails] = useState({
    title: "",
    description: "",
    imageUrl: "",
    selectedIcons: [],
  });
  const [crop, setCrop] = useState({ aspect: 16 / 9, width: 50, unit: "%" });
  const [croppedImageUrl, setCroppedImageUrl] = useState("");
  const imageRef = useRef(null);
  const cardRef = useRef(null); // Reference to the card element

  const handleCardTypeChange = (type) => {
    setSelectedCardType(type);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleIconSelect = (event) => {
    if (
      cardDetails.selectedIcons.length < 4 &&
      !cardDetails.selectedIcons.includes(event.target.value)
    ) {
      setCardDetails({
        ...cardDetails,
        selectedIcons: [...cardDetails.selectedIcons, event.target.value],
      });
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setCardDetails({ ...cardDetails, imageUrl: fileReader.result });
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  const onImageLoaded = useCallback((img) => {
    imageRef.current = img;
  }, []);

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const makeClientCrop = async (crop) => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef.current,
        crop,
        "newFile.jpeg"
      );
      setCroppedImageUrl(croppedImageUrl);
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(croppedImageUrl);
        resolve(window.URL.createObjectURL(blob));
      }, "image/jpeg");
    });
  };

  const renderCardTemplate = () => {
    const cardProps = {
      ...cardDetails,
      imageUrl: croppedImageUrl || cardDetails.imageUrl,
    };
    switch (selectedCardType) {
      case "Ability":
        return <ItemCardTemplate {...cardProps} />;
      case "Item":
        return <AbilityCardTemplate {...cardProps} />;
      default:
        return <p>Select a card type</p>;
    }
  };

  const downloadCardImage = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // Increase this value for higher resolution
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "card-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const saveCardToDatabase = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // Increase this value for higher resolution
      });
      const cardImage = canvas.toDataURL("image/png");

      // Save this cardImage to Supabase
      const { data, error } = await supabase.from("cards").insert([
        {
          title: cardDetails.title,
          description: cardDetails.description,
          imageUrl: cardImage, // Save the captured image
          selectedIcons: cardDetails.selectedIcons,
        },
      ]);

      if (error) {
        console.error("Error saving card:", error);
      } else {
        console.log("Card saved successfully:", data);
      }
    }
  };

  return (
    <div className="card-creator-container">
      <div className="input-container">
        <CardTypeSelector onCardTypeChange={handleCardTypeChange} />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={cardDetails.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={cardDetails.description}
          onChange={handleInputChange}
        />
        <Select
          value=""
          onChange={handleIconSelect}
          displayEmpty
          style={{ marginTop: 10 }}
        >
          <MenuItem value="" disabled>
            Select Icon
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {cardDetails.imageUrl && (
          <ReactCrop
            src={cardDetails.imageUrl}
            crop={crop}
            ruleOfThirds
            onImageLoaded={onImageLoaded}
            onComplete={onCropComplete}
            onChange={(newCrop) => setCrop(newCrop)}
          />
        )}

        <Button
          onClick={downloadCardImage}
          variant="contained" // Adds background color
          color="primary" // Use primary theme color
          style={{ marginTop: "10px", marginRight: "10px" }}
        >
          Download Card
        </Button>
        <Button
          onClick={saveCardToDatabase}
          variant="contained" // Adds background color
          color="secondary" // Use secondary theme color
          style={{ marginTop: "10px" }}
        >
          Save Card
        </Button>

        <Link to="/gallery" style={{ textDecoration: "none" }}></Link>
      </div>
      <div className="card-preview" ref={cardRef}>
        {renderCardTemplate()}
      </div>
    </div>
  );
}

export default CardCreator;

import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient"; // Adjust path as necessary
import "./CardGallery.css"; // Import the CSS file

function CardGallery() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const { data, error } = await supabase.from("cards").select();
      if (error) console.log("Error fetching cards:", error);
      else setCards(data);
    };

    fetchCards();
  }, []);

  return (
    <div className="card-gallery">
      {cards.map((card, index) => (
        <div key={index} className="card-container">
          <img src={card.imageUrl} alt={card.title} className="card-image" />
        </div>
      ))}
    </div>
  );
}
export default CardGallery;

import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient"; // Adjust path as necessary

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
    <div>
      {cards.map((card, index) => (
        <div key={index}>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          {/* Display card image and icons */}
        </div>
      ))}
    </div>
  );
}

export default CardGallery;
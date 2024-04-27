import React, { useState } from "react";

type Category = {
  name: string;
};

type EventInfoProps = {
  location: string;
  artist: string;
  date: string;
};

// EventInfoBar component
const EventInfoBar: React.FC<EventInfoProps> = ({ location, artist, date }) => {
  return (
    <div
      className="event-info-bar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#333",
        color: "white",
        fontSize: "16px",
      }}
    >
      <span>{location}</span>
      <span>{artist}</span>
      <span>{date}</span>
    </div>
  );
};

// Categories data
const categories: Category[] = [
  { name: "K-pop" },
  { name: "J-pop" },
  { name: "Golden State Warriors" },
  { name: "Sports" },
  { name: "Anime" },
  { name: "Games" },
  { name: "Webinar" },
];

// CategoryBar component
const CategoryBar: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0].name
  );

  return (
    <div>
      {/* Event Information Bar */}
      <EventInfoBar
        location="Seoul, South Korea"
        artist="NCT 127"
        date="April 14, 2024"
      />

      {/* Category Navigation Bar */}
      <nav
        className="flex justify-center items-center p-4"
        style={{ backgroundColor: "#222" }}
      >
        <div className="flex overflow-auto">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`${
                activeCategory === category.name
                  ? "bg-blue-500 text-white"
                  : "bg-blue-700 text-white"
              } hover:bg-blue-500 rounded-lg text-lg px-6 py-2 focus:outline-none transition-colors duration-300 m-1`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CategoryBar;

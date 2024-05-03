import React from "react";
import EventCard from "./shared/EventCard"; // Import the EventCard component
import "./EventList.css";
import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

interface EventListProps {
  displayMode: string;
}

const EventList: React.FC<EventListProps> = ({ displayMode }) => {
  const navigate = useNavigate();
  // const [events, setEvents] = useState<Event[]>([]);
  const events = [
    {
      id: "1",
      title: "Summer Music Festival",
      description: "Join us for an amazing day of music and fun!",
      startTime: "2021-08-01T12:00:00Z",
      endTime: "2021-08-01T22:00:00Z",
      artistName: "DJ Example",
      imageUrls: ["https://example.com/image.jpg"],
      location: "Downtown Park",
    },
    {
      id: "2",
      title: "Local Art Exhibition",
      description: "Experience stunning artworks from local artists.",
      startTime: "2021-08-05T09:00:00Z",
      endTime: "2021-08-05T18:00:00Z",
      artistName: "Art Collective",
      imageUrls: ["https://example.com/art.jpg"],
      location: "City Art Gallery",
    },
  ];
  const gridStyle = {
    display: displayMode === "grid" ? "grid" : "block",
    gridTemplateColumns: displayMode === "grid" ? "repeat(3, 1fr)" : "none",
    gap: displayMode === "grid" ? "20px" : "0",
    paddingLeft: "50px",
    paddingRight: "50px",
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("here", e.target);
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      {" "}
      // Added padding for overall alignment
      <div
        className="grid place-items-center h-screen p-4 pb-5"
        style={gridStyle}
        onClick={handleClick}
      >
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            description={event.description}
            startTime={event.startTime}
            endTime={event.endTime}
            artistName={event.artistName}
            imageUrls={event.imageUrls}
            location={event.location}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;

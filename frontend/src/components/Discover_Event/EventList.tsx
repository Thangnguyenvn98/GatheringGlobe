import React from "react";
import EventCard from "./shared/EventCard"; // Import the EventCard component
import "./EventList.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface EventProps {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  artistName: string;
  imageUrls: string[];
  location: string;
}

interface EventListProps {
  displayMode: string;
  events: EventProps[];
}

const EventList: React.FC<EventListProps> = ({ displayMode }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventProps[]>([]);
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
  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      // Example data, replace with actual fetch call
      const fetchedEvents = [
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
        // More events...
      ];
      setEvents(fetchedEvents); // Set the fetched events to state
    };

    fetchData();
  }, []);

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
            key={event.id} // Use event.id assuming each event has a unique id
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

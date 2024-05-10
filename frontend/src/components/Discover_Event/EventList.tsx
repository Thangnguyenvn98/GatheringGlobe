import React from "react";
import EventCard from "../shared/EventCard";
import "./EventList.css";
import { useNavigate } from "react-router-dom";
import eventdatas from "./eventdatas";

interface eventdataListProps {
  displayMode: string;
}

const EventdataList: React.FC<eventdataListProps> = ({ displayMode }) => {
  const navigate = useNavigate();

  const gridStyle = {
    display: displayMode === "grid" ? "grid" : "block",
    gridTemplateColumns: displayMode === "grid" ? "repeat(3, 1fr)" : "none",
    gap: displayMode === "grid" ? "20px" : "0",
    paddingLeft: "50px",
    paddingRight: "50px",
  };

  const handleClick = (eventData: unknown) => {
    navigate("/discover-event-details", {
      state: eventData,
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className="grid place-items-center p-4 pb-5" style={gridStyle}>
        {eventdatas.map((eventData) => (
          <div key={eventData.id}>
            <EventCard
              key={eventData.id}
              title={eventData.title}
              description={eventData.description}
              startTime={eventData.startTime}
              endTime={eventData.endTime}
              artistName={eventData.artistName}
              imageUrls={eventData.imageUrls}
              location={eventData.location}
              onClick={() => handleClick(eventData)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventdataList;

import React from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../shared/EventCard";
import { EventType } from "@/types/event";
import "./MainContent.css";

interface MainContentProps {
  events: EventType[];
}

const MainContent: React.FC<MainContentProps> = ({ events }) => {
  const navigate = useNavigate();

  const handleClick = (event: EventType) => {
    navigate(`/discover/${event.title.replace(/ /g, "-")}/event/${event._id}`);
  };

  return (
    <div className="center-container">
      <div className="inner-container">
        {events.length === 0 ? (
          <p>No events found</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="event-card-container">
              <EventCard event={event} onClick={() => handleClick(event)} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MainContent;

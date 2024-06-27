import React from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../shared/EventCard";
import { EventType } from "@/types/event";

interface MainContentProps {
  events: EventType[];
}

const MainContent: React.FC<MainContentProps> = ({ events }) => {
  const navigate = useNavigate();

  const handleClick = (event: EventType) => {
    navigate(`/discover/${event.title.replace(/ /g, "-")}/event/${event._id}`);
  };

  return (
    <div>
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            onClick={() => handleClick(event)}
          />
        ))
      )}
    </div>
  );
};

export default MainContent;

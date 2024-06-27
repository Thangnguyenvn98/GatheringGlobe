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
    <div className="flex justify-center items-start min-h-screen p-4 w-full">
      <div className="flex flex-col items-center w-full max-w-2xl">
        {events.length === 0 ? (
          <p>No events found</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="w-full mb-4">
              <EventCard event={event} onClick={() => handleClick(event)} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MainContent;

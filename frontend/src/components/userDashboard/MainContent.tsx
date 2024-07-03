import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../shared/EventCard";
import { EventType } from "@/types/event";
import EventPaginationButton from "../homepage/homepageEventPagination";

interface MainContentProps {
  events: EventType[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onDeleteEvent: (eventId: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  events,
  totalPages,
  currentPage,
  onPageChange,
  onDeleteEvent,
}) => {
  const navigate = useNavigate();
  const topOfListRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: EventType) => {
    navigate(`/discover/${event.title.replace(/ /g, "-")}/event/${event._id}`);
  };

  return (
    <div className="flex justify-center items-start p-4 w-full">
      <div className="flex flex-col items-center w-full max-w-3xl">
        <div ref={topOfListRef} />
        {events.length === 0 ? (
          <p>No events found</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="w-full">
              <EventCard
                event={event}
                onClick={() => handleClick(event)}
                onDeleteEvent={onDeleteEvent}
              />
            </div>
          ))
        )}
        <div
          className="mt-4 w-full flex"
          style={{ justifyContent: "flex-start", marginRight: "130px" }}
        >
          <EventPaginationButton
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            isPlaceholderData={false}
          />
        </div>
      </div>
    </div>
  );
};

export default MainContent;

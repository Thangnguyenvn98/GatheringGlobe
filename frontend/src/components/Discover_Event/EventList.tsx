import { Loader2, ServerCrash } from "lucide-react";
import "./EventList.css";
import EventCard from "../shared/EventCard";
import { useNavigate } from "react-router-dom";
import { EventType } from "@/types/event";
import React, { RefObject } from "react";

interface EventListProps {
  isPending: boolean;
  isError: boolean;
  eventdatas: EventType[];
  topOfListRef: RefObject<HTMLDivElement>;
}

const EventList: React.FC<EventListProps> = ({
  isPending,
  isError,
  eventdatas,
  topOfListRef,
}) => {
  const navigate = useNavigate();

  const handleClick = (eventData: EventType) => {
    navigate(
      `/discover/${eventData.title.replace(/ /g, "-")}/event/${eventData._id}`,
    );
  };

  if (isPending) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  if (!eventdatas.length) {
    return <div>No data found for this filter</div>;
  }

  return (
    <div
      className="place-items-center p-4 pb-5 grid grid-cols-2 h-full"
      ref={topOfListRef}
    >
      {eventdatas.map((eventData) => (
        <EventCard
          key={eventData._id}
          event={eventData}
          onClick={() => handleClick(eventData)}
        />
      ))}
    </div>
  );
};

export default EventList;

import { Link } from "react-router-dom";
import "./EventCard.css";
import { EventType } from "@/types/event";

const EventCard = ({
  event,
  onClick,
}: {
  event: EventType | undefined;
  onClick: () => void;
}) => {
  // Ensure event is defined before rendering
  if (!event) {
    return <div>Loading...</div>; // Render a fallback UI while event data is being loaded
  }
  const eventLink = `/discover/${event.title}/event/${event._id}`;
  return (
    <Link
      to={eventLink}
      className="w-9/12 flex mb-5 bg-white shadow-md rounded-lg p-4 {cursor: pointer}  "
      onClick={onClick}
    >
      <div className="container w-1/3">
        <img
          src={event.imageUrls[0]} // Assuming the first URL is the primary image
          alt={event.title}
          className="w-60 h-auto object-contain rounded-lg mr-4 "
        />
      </div>

      <div
        className="flex-1 flex flex-col justify-center pl-4 "
        onClick={onClick}
      >
        <div className="event-description">
          <h1 className="text-lg font-bold py-2">{event.title}</h1>
          <h2 className="text-sm text-gray-600 py-2">{event.artistName}</h2>
          <p className="text-sm w-full py-2">{event.description}</p>
          <div>
            {event.tickets.map((ticket) => {
              return (
                <p className="text-sm py-2">
                  {ticket.ticketName} ${ticket.price.toFixed(2)}
                </p>
              );
            })}
          </div>
          <div className="text-xs text-gray-500 mt-2 ">
            <h3 className="py-2">Start: {event.startTime}</h3>
            <h3 className="py-2">End: {event.endTime}</h3>
            <h3>Location: {event.location}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;

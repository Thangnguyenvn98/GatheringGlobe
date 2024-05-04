import React from "react";
import { Event } from "@/types/event";

const EventCard: React.FC<Omit<Event, "id">> = ({
  title,
  description,
  startTime,
  endTime,
  artistName,
  imageUrls,
  location,
}) => {
  return (
    <div className="flex mb-5 bg-white shadow-md rounded-lg p-4">
      <img
        src={imageUrls[0]} // Assuming the first URL is the primary image
        alt={title}
        className="w-60 h-auto object-contain rounded-lg mr-4 "
      />

      <div className="flex-1 flex flex-col justify-center pl-4">
        <div className="event-description">
          <h1 className="text-lg font-bold py-2">{title}</h1>
          <h2 className="text-sm text-gray-600 py-2">{artistName}</h2>
          <h3 className="text-sm py-2">{description}</h3>
          <div className="text-xs text-gray-500 mt-2 ">
            <h3 className="py-2">Start: {startTime}</h3>
            <h3 className="py-2">End: {endTime}</h3>
            <h3>Location: {location}</h3>
          </div>
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-auto">
            View Event Details
            {/* dunfg link react */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

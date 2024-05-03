import React from "react";

interface EventProps {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  artistName: string;
  imageUrls: string[];
  location: string;
}

const EventCard: React.FC<EventProps> = ({
  title,
  description,
  startTime,
  endTime,
  artistName,
  imageUrls,
  location,
}) => {
  return (
    <div className="mb-5 bg-white shadow-md rounded-lg p-4">
      <img
        src={imageUrls[0]} // Assuming the first URL is the primary image
        alt={title}
        className="w-full max-w-xs h-auto rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{artistName}</p>
        <p className="text-sm">{description}</p>
        <div className="text-xs text-gray-500 mt-2">
          <p>Start: {startTime}</p>
          <p>End: {endTime}</p>
          <p>Location: {location}</p>
        </div>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Event Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;

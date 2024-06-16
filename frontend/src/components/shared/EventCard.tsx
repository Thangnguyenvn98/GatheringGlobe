import React from "react";
import "./EventCard.css";

interface EventCardProps {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  artistName: string;
  imageUrls: string[];
  location: string;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  startTime,
  endTime,
  artistName,
  imageUrls,
  location,
  onClick,
}) => {
  return (
    <div
      className="w-9/12 flex mb-5 bg-white shadow-md rounded-lg p-4 {cursor: pointer}"
      onClick={onClick}
    >
      <div className="container w-1/3">
        <img
          src={imageUrls[0]} // Assuming the first URL is the primary image
          alt={title}
          className="w-60 h-auto object-contain rounded-lg mr-4 "
        />
      </div>

      <div
        className="flex-1 flex flex-col justify-center pl-4"
        onClick={onClick}
      >
        <div className="event-description">
          <h1 className="text-lg font-bold py-2">{title}</h1>
          <h2 className="text-sm text-gray-600 py-2">{artistName}</h2>
          <p className="text-sm w-full py-2">{description}</p>
          <div className="text-xs text-gray-500 mt-2 ">
            <h3 className="py-2">Start: {startTime}</h3>
            <h3 className="py-2">End: {endTime}</h3>
            <h3>Location: {location}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

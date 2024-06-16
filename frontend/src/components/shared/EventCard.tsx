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
      className="event-card-container w-9/12 flex mb-5 bg-white shadow-md rounded-lg p-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="container w-1/3 flex justify-center items-center">
        <img
          src={imageUrls[0]} // Assuming the first URL is the primary image
          alt={title}
          className="event-card-image w-60 h-auto  rounded-xl mr-4 "
        />
      </div>

      <div
        className="flex-1 flex flex-col justify-center pl-4"
        onClick={onClick}
      >
        {
          /* <div className="event-description flex flex-col space-y-2">
          <div className="flex items-center space-x-4">
            {" "}
            <h1 className="text-lg font-bold mr-7">{title}</h1>
            <h3 className="text-xs"> {startTime}</h3>
            <h3 className="text-xs ">{endTime}</h3>
          </div>
          <h3 className="text-xs text-gray-500">Location: {location}</h3>
          <h2 className="text-sm text-gray-600">{artistName}</h2>
          <p className="text-sm">{description}</p>
        </div> */
          <div className="event-description flex flex-col space-y-2">
            <div className="flex justify-between items-center w-full">
              <h1 className="text-lg font-bold">{title}</h1>
              <div className="flex space-x-2 text-xs">
                <h3>{startTime}</h3>
                <h3>{endTime}</h3>
              </div>
            </div>
            <h3 className="text-xs text-gray-500">Location: {location}</h3>
            <h2 className="text-sm text-gray-600">{artistName}</h2>
            <p className="text-sm">{description}</p>
          </div>
        }
      </div>
    </div>
  );
};

export default EventCard;

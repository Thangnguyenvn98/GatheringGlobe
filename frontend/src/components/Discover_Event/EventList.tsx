// import React from "react";
import EventCard from "../shared/EventCard";
import "./EventList.css";
import { useNavigate } from "react-router-dom";
import { TicketType } from "@/types/ticket";
// import eventdatas from "./eventdatas";

// interface eventdataListProps {
//   displayMode: string;
// }

type EventType = {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  venueId?: string;
  capacity?: number;
  organizerId: string;
  location: string;
  categories: string[];
  artistName: string;
  imageUrls: string[];
  tickets: TicketType[]; // Reference to ticket IDs
  roomChatLink: string;
};
type EventListType = EventType[];

const EventdataList = ({
  eventDataFromParent,
}: {
  eventDataFromParent: EventListType;
}) => {
  const navigate = useNavigate();
  const displayMode = "grid";
  const eventdatas = eventDataFromParent;
  console.log("console.log from EventList", eventdatas);
  const gridStyle = {
    display: displayMode === "grid" ? "grid" : "block",
    gridTemplateColumns: displayMode === "grid" ? "repeat(3, 1fr)" : "none",
    gap: displayMode === "grid" ? "20px" : "0",
    paddingLeft: "50px",
    paddingRight: "50px",
  };

  const handleClick = (eventData: unknown) => {
    navigate("/discover-event-details", {
      state: eventData,
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className="grid place-items-center p-4 pb-5" style={gridStyle}>
        {eventdatas?.map((eventData: any) => (
          <EventCard
            key={eventData._id}
            title={eventData.title}
            description={eventData.description}
            startTime={eventData.startTime.toString()}
            endTime={eventData.endTime.toString()}
            artistName={eventData.artistName}
            imageUrls={eventData.imageUrls}
            location={eventData.location}
            onClick={() => handleClick(eventData)}
          />
        ))}
      </div>
    </div>
  );
};

export default EventdataList;

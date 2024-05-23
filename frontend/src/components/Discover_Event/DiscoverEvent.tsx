import React from "react";
import EventList from "./EventList";
import FilterSection from "./FilterSection";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom"; //to call props in event card to the even detail page by clicking the button "view event details"
import { TicketType } from "@/types/ticket";

const DiscoverEvent: React.FC = () => {
  const location = useLocation();
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
    __v: number;
  };
  type EventListType = EventType[];
  let eventData: EventListType = location.state;
  return (
    <div>
      <div className="grid grid-cols-6 ps-8 pt-8">
        <FilterSection />
        <div className="col-span-4">
          <EventList eventDataFromParent={eventData} />
        </div>
      </div>
      <Pagination />
    </div>
  );
};

export default DiscoverEvent;

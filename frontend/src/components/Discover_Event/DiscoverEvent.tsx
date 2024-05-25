import React from "react";
import EventList from "./EventList";
import FilterSection from "./FilterSection";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom"; //to call props in event card to the even detail page by clicking the button "view event details"
import { useNavigate } from "react-router-dom";
import { EventType } from "@/types/event";
import axios from "axios";

const DiscoverEvent: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
  const location = useLocation();
  const fetchData = async () => {
    const navigate = useNavigate();
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/filter`);
      if (response.status === 200) {
        //if the data fetched successfully (status code === 200), navigate to  the same page with data
        navigate(`/discover/allevents`, {
          state: response.data,
        });
      }
    } catch (error) {
      console.error("Fail to search: ", error);
    }
  };
  //if the page is access for the first time, we fetch and show all events
  if (location.pathname == "/discover") {
    fetchData();
  }
  let eventData: EventType[] = location.state;
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

import EventCard from "../shared/EventCard";
import "./EventList.css";
import { EventType } from "@/types/event";
import { useFilterParams } from "@/services/queries";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom"
// import { useEffect } from "react"
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";

const EventdataList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // Get all search params as an iterable object
  const allSearchParams = queryString.stringify(
    Object.fromEntries(searchParams),
    { encode: true },
  );
  // useEffect (() => {
  //   console.log("allSearchParams changed", allSearchParams)
  // },[searchParams])
  const { data, error, isLoading } = useFilterParams(allSearchParams || "");
  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>Error occurred when trying to fetch data: {String(error)} </div>
    );
  if (data.message != undefined)
    return <div>No data found for this Filter</div>;
  let events: EventType[] = data;

  const handleClick = (eventData: EventType) => {
    navigate(
      `/discover/${eventData.title.replace(/ /g, "-")}/event/${eventData._id}`,
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className="flex flex-col place-items-center p-4 pb-5">
        {events.map((eventData) => (
          <EventCard
            key={eventData._id}
            event={eventData} // Pass the entire event object as a prop
            onClick={() => handleClick(eventData)}
          />
        ))}
      </div>
    </div>
  );
};

export default EventdataList;

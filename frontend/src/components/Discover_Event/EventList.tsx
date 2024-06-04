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
  let eventdatas: EventType[] = data;

  const handleClick = (eventData: EventType) => {
    navigate(
      `/discover/${eventData.title.replace(" ", "-")}/event/${eventData._id}`,
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className="flex flex-col place-items-center p-4 pb-5">
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

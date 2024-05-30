import EventCard from "../shared/EventCard";
import "./EventList.css";
// import { useNavigate } from "react-router-dom";
// import { TicketType } from "@/types/ticket";
import { EventType } from "@/types/event";
import { useFilterParams } from "@/services/queries";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

const EventdataList = ({ paramsFromParent }: { paramsFromParent: string }) => {
  const navigate = useNavigate();
  let params = paramsFromParent;
  console.log(params);
  const { data, error, isLoading } = useFilterParams(params || "");
  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>Error occurred when trying to fetch data: {String(error)} </div>
    );
  if (data.message != undefined)
    return <div>No data found for this Filter</div>;

  const eventdatas = data;

  const handleClick = (eventData: EventType) => {
    navigate(`/discover/${eventData.title}/event/${eventData._id}`);
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

import { useNavigate } from "react-router-dom";
import EventCard from "../shared/EventCard";
// import UserProfile from "../streaming/[username]/UserProfile";
import { EventType } from "@/types/event";

const MainContent = ({ events }: { events: EventType[] }) => {
  const navigate = useNavigate();
  const handleClick = (event: EventType) => {
    navigate(`/discover/${event.title.replace(/ /g, "-")}/event/${event._id}`);
  };
  return (
    <div>
      {!events
        ? null
        : events.map((event) => (
            <EventCard
              key={event._id}
              event={event} // Pass the event object as a prop
              onClick={() => handleClick(event)}
            />
          ))}
    </div>
  );
};

export default MainContent;

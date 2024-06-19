import EventCard from "../shared/EventCard";
// import UserProfile from "../streaming/[username]/UserProfile";
import { EventType } from "@/types/event";

const MainContent = ({ events }: { events: EventType[] }) => {
  console.log(events);
  return (
    <div>
      {!events
        ? null
        : events.map((event) => (
            <EventCard
              key={event._id}
              event={event} // Pass the event object as a prop
            />
          ))}
    </div>
  );
};

export default MainContent;

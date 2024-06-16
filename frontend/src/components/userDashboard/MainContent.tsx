import EventCard from "../shared/EventCard";
// import UserProfile from "../streaming/[username]/UserProfile";

interface Event {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  artistName: string;
  imageUrls: string[];
  location: string;
  _id: string;
}

const MainContent = ({ events }: { events: Event[] }) => {
  console.log(events);
  return (
    <div>
      {!events
        ? null
        : events.map((event) => (
            <EventCard
              key={event._id}
              title={event.title}
              description={event.description}
              startTime={new Date(event.startTime).toLocaleString()}
              endTime={new Date(event.endTime).toLocaleString()}
              artistName={event.artistName}
              imageUrls={event.imageUrls}
              location={event.location}
              onClick={() => console.log("Event Clicked:", event.title)}
            />
          ))}
    </div>
  );
};

export default MainContent;

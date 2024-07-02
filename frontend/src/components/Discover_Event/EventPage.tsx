import EventForm from "../newEventForm/EventForm";
import { useParams } from "react-router-dom";
import { useCurrentEventDetail } from "@/services/queries";

const EventPage = () => {
  const { eventId } = useParams<{ eventId: string }>();

  const {
    data: eventData,
    isLoading,
    error,
  } = useCurrentEventDetail(eventId || "");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="flex-col">
      <div className="flex-1 p-8">
        <EventForm initialData={eventData} />
      </div>
    </div>
  );
};

export default EventPage;

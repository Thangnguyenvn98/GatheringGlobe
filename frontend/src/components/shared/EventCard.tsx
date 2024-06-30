import { Link, useLocation, useNavigate } from "react-router-dom";
import "./EventCard.css";
import { EventType } from "@/types/event";
import { Ticket, Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { Button } from "../ui/button";
import { useCurrentUser } from "@/services/queries";

const EventCard = ({
  event,
  onClick,
}: {
  event: EventType | undefined;
  onClick: () => void;
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!event) {
    return <div>Loading...</div>;
  }

  const eventLink = `/discover/${event.title}/event/${event._id}`;
  const { data: userData } = useCurrentUser();
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString),
    );
  };

  const getTicketColor = (index: number) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-pink-100 text-pink-800",
    ];
    return colors[index % colors.length];
  };

  const updateEvent = async (eventId: string, updatedData: any) => {
    try {
      const response = await axios.patch(
        `/api/events/${eventId}/updateEvent`,
        updatedData,
      );
      console.log(response.data.message);
      // handle successful update, e.g., update state or UI
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to update event", error.response?.data.message);
      } else {
        console.error("Failed to update event", error);
      }
    }
  };
  const deleteEvent = async (eventId: string) => {
    try {
      const response = await axios.delete(`/api/events/${eventId}/deleteEvent`);
      console.log(response.data.message);
      // handle successful deletion, e.g., update state or UI
      navigate(`/dashboard/${userData?.username ?? ""}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to delete event", error.response?.data.message);
      } else {
        console.error("Failed to delete event", error);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(event._id);
    }
  };

  const handleUpdate = async () => {
    const updatedData = {
      title: "Updated Event Title", // Add other fields you want to update
    };
    await updateEvent(event._id, updatedData);
  };

  const hasManyTickets = event.tickets.length > 2; // Adjust the number of tickets to determine when to expand

  return (
    <div
      className={`event-card-container flex flex-col items-center justify-center mb-5 w-[600px] bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 ${
        hasManyTickets ? "min-h-[200px] h-auto" : "h-[200px]"
      }`}
    >
      <div className="flex w-full">
        <Link to={eventLink} className="flex w-full">
          <div onClick={onClick} className="w-[150px] h-[150px]">
            <img
              src={event.imageUrls[0]} // Assuming the first URL is the primary image
              alt={event.title}
              className="event-card-image w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center pl-4 relative overflow-hidden">
            <h1 className="text-xl font-bold text-black">{event.title}</h1>
            <div className="text-base text-gray-600">
              <p>{formatDate(event.startTime)}</p>
              <p>{event.location}</p>
            </div>

            {location.pathname.includes("/dashboard") ? ( // Check if the path includes '/dashboard'
              <div className="text-base font-semibold">
                {event.tickets.map((ticket, index) => (
                  <div
                    key={index}
                    className={`flex items-center mb-2 p-2 border rounded-lg ${getTicketColor(index)}`}
                  >
                    <Ticket className="mr-2" />
                    <span className="font-medium">{ticket.type}:</span>
                    <span className="ml-2">${ticket.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-base text-black font-semibold">
                From $
                {Math.min(
                  ...event.tickets.map((ticket) => ticket.price),
                ).toFixed(2)}
              </p>
            )}
          </div>
        </Link>
        {location.pathname.includes("/dashboard") && (
          <div className="ml-2 flex flex-col justify-center self-start gap-1 py-2">
            <Button onClick={handleUpdate} className="bg-yellow-500 text-white">
              <Pencil className="w-5 h-5" />
            </Button>
            <Button onClick={handleDelete} className="bg-red-500 text-white">
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;

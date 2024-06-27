// import { Link, useLocation } from "react-router-dom";
// import "./EventCard.css";
// import { EventType } from "@/types/event";

// const EventCard = ({
//   event,
//   onClick,
// }: {
//   event: EventType | undefined;
//   onClick: () => void;
// }) => {
//   const location = useLocation(); // Use useLocation to get the current route

//   // Ensure event is defined before rendering
//   if (!event) {
//     return <div>Loading...</div>; // Render a fallback UI while event data is being loaded
//   }

//   const eventLink = `/discover/${event.title}/event/${event._id}`;

//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = {
//       weekday: "short",
//       month: "short",
//       day: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//       hour12: true,
//     };
//     return new Intl.DateTimeFormat("en-US", options).format(
//       new Date(dateString),
//     );
//   };

//   return (
//     <Link
//       to={eventLink}
//       className="event-card-container flex mb-5 bg-white shadow-md rounded-lg py-3 px-3 cursor-pointer hover:shadow-lg transition-shadow duration-300"
//       onClick={onClick}
//     >
//       <div className="w-1/4">
//         <img
//           src={event.imageUrls[0]} // Assuming the first URL is the primary image
//           alt={event.title}
//           className="event-card-image w-full h-full object-cover rounded-lg"
//         />
//       </div>

//       <div className="flex-1 flex flex-col justify-center pl-4">
//         <h1 className="text-xl font-bold text-black">{event.title}</h1>
//         <div className="text-base text-gray-600">
//           <p>{formatDate(event.startTime)}</p>
//           <p>{event.location}</p>
//         </div>

//         {location.pathname.includes("/dashboard") ? ( // Check if the path includes '/dashboard'
//           <div className="text-base text-black font-semibold">
//             {event.tickets.map((ticket, index) => (
//               <p key={index}>
//                 {ticket.type}: ${ticket.price.toFixed(2)}
//               </p>
//             ))}
//           </div>
//         ) : (
//           <p className="text-base text-black font-semibold">
//             From $
//             {Math.min(...event.tickets.map((ticket) => ticket.price)).toFixed(
//               2,
//             )}
//           </p>
//         )}
//       </div>
//     </Link>
//   );
// };

// export default EventCard;

import { Link, useLocation } from "react-router-dom";
import "./EventCard.css";
import { EventType } from "@/types/event";
import { Ticket } from "lucide-react"; // Importing an icon from Lucide

const EventCard = ({
  event,
  onClick,
}: {
  event: EventType | undefined;
  onClick: () => void;
}) => {
  const location = useLocation(); // Use useLocation to get the current route

  // Ensure event is defined before rendering
  if (!event) {
    return <div>Loading...</div>; // Render a fallback UI while event data is being loaded
  }

  const eventLink = `/discover/${event.title}/event/${event._id}`;

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
      "bg-red-100 text-red-800",
    ];
    return colors[index % colors.length];
  };

  return (
    <Link
      to={eventLink}
      className="event-card-container flex mb-5 bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      <div className="w-1/4">
        <img
          src={event.imageUrls[0]} // Assuming the first URL is the primary image
          alt={event.title}
          className="event-card-image w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center pl-4">
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
            {Math.min(...event.tickets.map((ticket) => ticket.price)).toFixed(
              2,
            )}
          </p>
        )}
      </div>
    </Link>
  );
};

export default EventCard;

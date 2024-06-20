// import { Link } from "react-router-dom";
// import "./EventCard.css";
// import { EventType } from "@/types/event";

// const EventCard = ({
//   event,
//   onClick,
// }: {
//   event: EventType | undefined;
//   onClick: () => void;
// }) => {
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
//       className="event-card-container w-9/12 flex mb-5 bg-white shadow-md rounded-lg p-4 cursor-pointer"
//       onClick={onClick}
//     >
//       <div className="container w-1/3 flex justify-center items-center">
//         <img
//           src={event.imageUrls[0]} // Assuming the first URL is the primary image
//           alt={event.title}
//           className="event-card-image w-60 h-auto rounded-xl mr-4"
//         />
//       </div>

//       <div
//         className="flex-1 flex flex-col justify-center pl-4"
//         onClick={onClick}
//       >
//         <div className="event-description">
//           <h1 className="text-3xl font-bold py-2">{event.title}</h1>
//           <h2 className="text-sm text-gray-600 py-2">{event.artistName}</h2>
//           <p className="text-sm w-full py-2">{event.description}</p>
//           <div>
//             {event.tickets.map((ticket) => {
//               return (
//                 <p className="text-sm py-2" key={ticket.ticketName}>
//                   {ticket.ticketName} ${Number(ticket.price).toFixed(2)}
//                 </p>
//               );
//             })}
//           </div>
//           <div className="text-xs text-gray-500 mt-2">
//             <h3 className="py-2">Start: {formatDate(event.startTime)}</h3>
//             <h3 className="py-2">End: {formatDate(event.endTime)}</h3>
//             <h3>Location: {event.location}</h3>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default EventCard;

import { Link } from "react-router-dom";
import "./EventCard.css";
import { EventType } from "@/types/event";

const EventCard = ({
  event,
  onClick,
}: {
  event: EventType | undefined;
  onClick: () => void;
}) => {
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

  const truncateDescription = (description: string, wordLimit: number) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
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
        <h1 className="text-xl font-bold mb-2 text-black">{event.title}</h1>
        <div className="text-base text-gray-600 mb-1">
          <p>{formatDate(event.startTime)}</p>
          <p>{event.location}</p>
        </div>
        <p className="text-base text-black font-semibold">
          From $
          {Math.min(...event.tickets.map((ticket) => ticket.price)).toFixed(2)}
        </p>
        <p className="text-base text-gray-700">
          {truncateDescription(event.description, 18)}
        </p>
      </div>
    </Link>
  );
};

export default EventCard;

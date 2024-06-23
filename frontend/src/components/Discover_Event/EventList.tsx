import { Loader2, ServerCrash } from "lucide-react";
import "./EventList.css";
import EventCard from "../shared/EventCard";
import { useNavigate } from "react-router-dom";
import { EventType } from "@/types/event";
import React, { RefObject } from "react";

interface EventListProps {
  isPending: boolean;
  isError: boolean;
  eventdatas: EventType[];
  topOfListRef: RefObject<HTMLDivElement>;
}

const EventList: React.FC<EventListProps> = ({
  isPending,
  isError,
  eventdatas,
  topOfListRef,
}) => {
  const navigate = useNavigate();

  const handleClick = (eventData: EventType) => {
    navigate(
      `/discover/${eventData.title.replace(/ /g, "-")}/event/${eventData._id}`,
    );
  };

  if (isPending) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  if (!eventdatas.length) {
    return <div>No data found for this filter</div>;
  }

  return (
    <div
      className="flex flex-col place-items-center p-4 pb-5"
      ref={topOfListRef}
    >
      {eventdatas.map((eventData) => (
        <EventCard
          key={eventData._id}
          event={eventData}
          onClick={() => handleClick(eventData)}
        />
      ))}
    </div>
  );
};

export default EventList;

// import { Loader2, ServerCrash } from "lucide-react";
// import "./EventList.css";
// import EventCard from "../shared/EventCard";
// import { useFilterParams } from "@/services/queries";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import queryString from "query-string"; // Import the queryString module
// import { EventType } from "@/types/event";
// import "./EventList.css";

// interface EventListProps {
//   isPending: boolean;
//   isError: boolean;
//   eventdatas: EventType[];
//   topOfListRef: RefObject<HTMLDivElement>;
// }

// const EventdataList = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const allSearchParams = queryString.stringify(
//     Object.fromEntries(searchParams),
//     { encode: true },
//   );

//   const { data, error, isLoading } = useFilterParams(allSearchParams || "");

//   if (isLoading)
//     return (
//       <div className="flex flex-col flex-1 justify-center items-center">
//         <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
//         <p className="text-xs text-zinc-500 dark:text-zinc-400">
//           Loading messages...
//         </p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex flex-col flex-1 justify-center items-center">
//         <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
//         <p className="text-xs text-zinc-500 dark:text-zinc-400">
//           Something went wrong!
//         </p>
//       </div>
//     );

//   if (data.message) return <div>No data found for this Filter</div>;

//   const events: EventType[] = Array.isArray(data) ? data : [];

//   const handleClick = (eventData: EventType) => {
//     navigate(
//       `/discover/${eventData.title.replace(/ /g, "-")}/event/${eventData._id}`,
//     );
//   };

//   return (
//     <div className="flex flex-col place-items-center p-4 pb-5">
//       {events.map((eventData) => (
//         <EventCard
//           key={eventData._id}
//           event={eventData}
//           onClick={() => handleClick(eventData)}
//         />
//       ))}
//     </div>
//   );
// };

// export default EventdataList;
// code doesnt work

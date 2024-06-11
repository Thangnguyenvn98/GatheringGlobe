import { Loader2, ServerCrash } from "lucide-react";
// import EventCard from "../shared/EventCard";
import "./EventList.css";
// import { EventType } from "@/types/event";
// import { useFilterParams } from "@/services/queries";
// import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom"
// import { useEffect } from "react"
// import { useSearchParams } from "react-router-dom";
// import queryString from "query-string";

interface EventListProps {
  eventdatas: any;
  isPending: boolean;
  isError: boolean;
  topOfListRef: React.RefObject<HTMLDivElement>;
}

const EventdataList = ({
  eventdatas,
  isPending,
  isError,
  topOfListRef,
}: EventListProps) => {
  return (
    <div style={{ padding: "20px" }}>
      <div
        className="flex flex-col place-items-center p-4 pb-5"
        ref={topOfListRef}
      >
        {isPending ? (
          <div className="flex flex-col flex-1 justify-center items-center">
            <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Loading messages...
            </p>
          </div>
        ) : isError ? (
          <div className="flex flex-col flex-1 justify-center items-center">
            <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Something went wrong!
            </p>
          </div>
        ) : (
          // ) : (eventdatas?.map((eventData: any) => (
          // <EventCard
          //   key={eventData._id}
          //   title={eventData.title}
          //   description={eventData.description}
          //   startTime={eventData.startTime.toString()}
          //   endTime={eventData.endTime.toString()}
          //   artistName={eventData.artistName}
          //   imageUrls={eventData.imageUrls}
          //   location={eventData.location}
          //   onClick={() => handleClick(eventData)}
          // />
          eventdatas?.map((event: any, index: number) => (
            <Link
              to={`/discover/${event.title}/event/${event._id}`}
              className="flex flex-col"
              key={index}
            >
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-lg">
                <div className="h-[400px] w-auto relative">
                  <img
                    src={event.imageUrls[0]}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-y-4 p-4 bg-white/35 bg-opacity-10">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <h3>
                    {format(
                      parseISO(event.startTime),
                      "EEE, MMM dd, yyyy hh:mm a",
                    )}
                  </h3>
                  <h3 className="">{event.location}</h3>
                  <h3 className="font-semibold">
                    From ${event.minPrice?.toFixed(2)}
                  </h3>

                  <h3 className="font-medium ">{event.artistName}</h3>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default EventdataList;

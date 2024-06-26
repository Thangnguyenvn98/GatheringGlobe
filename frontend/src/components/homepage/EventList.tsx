import { Loader2, ServerCrash } from "lucide-react";
import "./EventList.css";
import { EventType } from "@/types/event";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

interface EventListProps {
  events: EventType[];
  isPending: boolean;
  isError: boolean;
  topOfListRef: React.RefObject<HTMLDivElement>;
}

const EventList = ({
  events,
  isPending,
  isError,
  topOfListRef,
}: EventListProps) => {
  return (
    <>
      <h1 className="mx-10 font-semibold text-2xl">Browsing All Events</h1>
      <div className="grid grid-cols-4 gap-4 m-10" ref={topOfListRef}>
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
          events?.map((event, index) => (
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
                  <h3 className="">{event.location.fullAddress}</h3>
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
    </>
  );
};

export default EventList;

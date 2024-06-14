import { Loader2, ServerCrash } from "lucide-react";
import "./EventList.css";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {eventdatas?.map((event: any, index: number) => (
              <div key={index}>
                <Link
                  to={`/discover/${event.title}/event/${event._id}`}
                  className="flex flex-col"
                >
                  <div className="rounded-xl overflow-hidden border border-gray-200 shadow-lg">
                    <div className="h-[400px] w-auto relative">
                      <img
                        src={event.imageUrls[0]}
                        alt={event.title}
                        className="w-[400px] h-[400px] object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-y-4 p-4 bg-white/35 bg-opacity-10">
                      <h3 className="font-semibold text-lg">
                        {event.title.length > 40
                          ? `${event.title.slice(0, 40)}...`
                          : event.title}
                      </h3>
                      <h3>
                        {format(
                          parseISO(event.startTime),
                          "EEE, MMM dd, yyyy hh:mm a",
                        )}
                      </h3>
                      <h3 className="">{event.location}</h3>
                      <h3 className="font-semibold">
                        From ${event.minPrice?.toFixed(2)} to $
                        {event.maxPrice?.toFixed(2)}
                      </h3>
                      <h3 className="font-medium ">{event.artistName}</h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventdataList;

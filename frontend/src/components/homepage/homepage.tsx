import Timer from "./timer";
import Events from "./events";
import EventList from "./EventList";
import { useAllEventsPagination } from "@/services/queries";
import { useRef, useState } from "react";
import EventPaginationButton from "./homepageEventPagination";
import EventCategory from "./EventCategory";

const Homepage = () => {
  const [page, setPage] = useState(1);
  const { isPending, isError, data, isPlaceholderData } =
    useAllEventsPagination(page);
  const topOfListRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    if (topOfListRef.current) {
      const yOffset = -200;
      const y =
        topOfListRef.current.getBoundingClientRect().top +
        window.scrollY +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col w-full mb-10 ">
      <Events />
      <div className="mt-10">
        <EventCategory />
        <EventList
          isPending={isPending}
          isError={isError}
          events={data?.events}
          topOfListRef={topOfListRef}
        />
      </div>
      <EventPaginationButton
        currentPage={page}
        onPageChange={handlePageChange}
        totalPages={data?.pagination?.totalPages}
        isPlaceholderData={isPlaceholderData}
      />
      <div className="mt-4">
        <Timer />
      </div>
    </div>
  );
};
export default Homepage;

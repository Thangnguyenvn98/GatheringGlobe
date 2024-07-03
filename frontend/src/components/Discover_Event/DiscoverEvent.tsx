import React, { useEffect, useRef, useState } from "react";
import EventList from "./EventList";
import FilterSection from "./FilterSection";
import { useFilterParams } from "@/services/queries";
import EventPaginationButton from "../homepage/homepageEventPagination";
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";
// import SearchMap from "./SearchMap";

const DiscoverEvent: React.FC = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || "1");

  const allSearchParams = queryString.stringify(
    Object.fromEntries(searchParams),
    { encode: true },
  );

  const { isPending, isError, data, isPlaceholderData } =
    useFilterParams(allSearchParams);
  const topOfListRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (newPage: number) => {
    setPage(String(newPage));
    searchParams.set("page", String(newPage));
    setSearchParams(searchParams);

    if (topOfListRef.current) {
      const yOffset = -200;
      const y =
        topOfListRef.current.getBoundingClientRect().top +
        window.scrollY +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setPage(searchParams.get("page") || "1");
  }, [searchParams]);

  return (
    <div className="left-0 w-full">
      <div className="grid grid-cols-10 w-full">
        <div className="col-span-2 bg-slate-300">
          <FilterSection />
        </div>
        <div className="col-span-7 h-full bg-red">
          <div className="flex flex-col mb-2 h-full justify-between">
            <div className="h-full">
              <EventList
                isPending={isPending}
                isError={isError}
                eventdatas={data?.eventMatched || []}
                topOfListRef={topOfListRef}
              />
            </div>
            <div className="mb-0">
              <EventPaginationButton
                currentPage={parseInt(page)}
                onPageChange={handlePageChange}
                totalPages={data?.pagination?.totalPages || 1}
                isPlaceholderData={isPlaceholderData}
              />
            </div>
          </div>
        </div>
        {/* <div className="hidden lg:flex">
          <SearchMap />
        </div> */}
      </div>
    </div>
  );
};

export default DiscoverEvent;

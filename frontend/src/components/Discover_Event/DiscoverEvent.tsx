import React from "react";
import EventList from "./EventList";
import FilterSection from "./FilterSection";
// import Pagination from "./Pagination";
// import { useAllEventsPagination } from "@/services/queries";
import { useFilterParams } from "@/services/queries";
import { useRef, useState } from "react";
import EventPaginationButton from "../homepage/homepageEventPagination";
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";
import SortSection from "./sort";
// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

const DiscoverEvent: React.FC = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(
    searchParams.get("page") ? searchParams.get("page") : "1",
  );

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

  return (
    <div>
      <div className="grid grid-cols-6 ps-8 pt-8">
        <FilterSection />
        <div className="col-span-4">
          <div className="flex flex-col">
            <div>
              <SortSection />
            </div>
            <div>
              <EventList
                isPending={isPending}
                isError={isError}
                eventdatas={data?.eventMatched}
                topOfListRef={topOfListRef}
              />
            </div>
          </div>
        </div>
      </div>
      <EventPaginationButton
        currentPage={parseInt(String(page))}
        onPageChange={handlePageChange}
        totalPages={data?.pagination?.totalPages}
        isPlaceholderData={isPlaceholderData}
      />
    </div>
  );
};

export default DiscoverEvent;

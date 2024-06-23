import React, { useEffect, useRef, useState } from "react";
import EventList from "./EventList";
import FilterSection from "./FilterSection";
import { useFilterParams } from "@/services/queries";
import EventPaginationButton from "../homepage/homepageEventPagination";
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";
import SearchMap from "./SearchMap";

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
    <div>
      <div className="grid grid-cols-6 ps-8 pt-8">
        <FilterSection />
        <div className="col-span-4 lg:col-span-3">
          <div className="flex flex-col mb-2">
            <EventList
              isPending={isPending}
              isError={isError}
              eventdatas={data?.eventMatched || []}
              topOfListRef={topOfListRef}
            />
            <EventPaginationButton
              currentPage={parseInt(page)}
              onPageChange={handlePageChange}
              totalPages={data?.pagination?.totalPages || 1}
              isPlaceholderData={isPlaceholderData}
            />
          </div>
        </div>
        <div className="hidden lg:flex">
          <SearchMap />
        </div>
      </div>
    </div>
  );
};

export default DiscoverEvent;

//code below doesnt work
// import React, { useEffect } from "react";
// import EventList from "./EventList";
// import FilterSection from "./FilterSection";
// import { useFilterParams } from "@/services/queries";
// import { useRef, useState } from "react";
// import EventPaginationButton from "../homepage/homepageEventPagination";
// import { useSearchParams } from "react-router-dom";
// import queryString from "query-string";
// import SearchMap from "./SearchMap";

// interface EventListProps {
//   isPending: boolean;
//   isError: boolean;
//   eventdatas: EventType[];
//   topOfListRef: RefObject<HTMLDivElement>;
// }

// const DiscoverEvent: React.FC = () => {
//   let [searchParams, setSearchParams] = useSearchParams();
//   const [page, setPage] = useState(
//     searchParams.get("page") ? searchParams.get("page") : "1",
//   );

//   const allSearchParams = queryString.stringify(
//     Object.fromEntries(searchParams),
//     { encode: true },
//   );

//   const { isPending, isError, data, isPlaceholderData } =
//     useFilterParams(allSearchParams);
//   const topOfListRef = useRef<HTMLDivElement>(null);

//   const handlePageChange = (newPage: number) => {
//     setPage(String(newPage));
//     searchParams.set("page", String(newPage));
//     setSearchParams(searchParams);

//     useEffect(() => {
//       console.log("page in search params change");
//       setPage(searchParams.get("page") ? searchParams.get("page") : "1");
//     }, [searchParams]);

//     if (topOfListRef.current) {
//       const yOffset = -200;
//       const y =
//         topOfListRef.current.getBoundingClientRect().top +
//         window.scrollY +
//         yOffset;

//       window.scrollTo({ top: y, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="">
//       <div className="grid grid-cols-6 ps-8 pt-8">
//         <FilterSection />
//         <div className="col-span-4 lg:col-span-3">
//           <div className="flex flex-col mb-2">
//             <div>
//               <EventList
//                 isPending={isPending}
//                 isError={isError}
//                 eventdatas={data?.eventMatched}
//                 topOfListRef={topOfListRef}
//               />
//             </div>
//             <EventPaginationButton
//               currentPage={parseInt(String(page))}
//               onPageChange={handlePageChange}
//               totalPages={data?.pagination?.totalPages}
//               isPlaceholderData={isPlaceholderData}
//             />
//           </div>
//         </div>
//         <div className="hidden lg:flex">
//           <SearchMap />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DiscoverEvent;

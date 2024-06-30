// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import SideBar from "./SideBar";
// import MainContent from "./MainContent";
// import { EventType } from "@/types/event";
// import { axiosInstance } from "@/services/api";

// const Dashboard = () => {
//   const [events, setEvents] = useState<EventType[]>([]);
//   const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
//   const [searchParams, setSearchParams] = useSearchParams();

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const result = await axiosInstance.get("/api/allEvents");
//         if (Array.isArray(result.data)) {
//           setEvents(result.data);
//         } else {
//           console.error("API response is not an array:", result.data);
//           setEvents([]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch events:", error);
//         setEvents([]);
//       }
//     }

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const now = new Date();
//     const category = searchParams.get("category") || "all-events";

//     let filtered = events;

//     if (category === "past-events") {
//       filtered = events.filter((event) => new Date(event.endTime) < now);
//     } else if (category === "upcoming-events") {
//       filtered = events.filter((event) => new Date(event.startTime) > now);
//     }

//     setFilteredEvents(filtered);
//   }, [events, searchParams]);

//   return (
//     <div className="flex">
//       <SideBar onSelectCategory={(category) => setSearchParams({ category })} />
//       <MainContent events={filteredEvents} totalPages={0} />
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SideBar from "./SideBar";
import MainContent from "./MainContent";
import { EventType } from "@/types/event";
import { axiosInstance } from "@/services/api";

const Dashboard = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axiosInstance.get("/api/allEvents");
        if (Array.isArray(result.data)) {
          setEvents(result.data);
        } else {
          console.error("API response is not an array:", result.data);
          setEvents([]);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setEvents([]);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const now = new Date();
    const category = searchParams.get("category") || "all-events";

    let filtered = events;

    if (category === "past-events") {
      filtered = events.filter((event) => new Date(event.endTime) < now);
    } else if (category === "upcoming-events") {
      filtered = events.filter((event) => new Date(event.startTime) > now);
    }

    setFilteredEvents(filtered);
  }, [events, searchParams]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    searchParams.set("page", String(newPage));
    setSearchParams(searchParams);
  };

  // Pagination logic
  const eventsPerPage = 4; // Adjust this value as needed
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const displayedEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage,
  );

  return (
    <div className="flex">
      <SideBar onSelectCategory={(category) => setSearchParams({ category })} />
      <MainContent
        events={displayedEvents}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Dashboard;

import React from "react";
import EventList from "./event-list/EventList";
import FilterSection from "./filter-section/FilterSection";
import Pagination from "./Pagination";

const DiscoverEvent: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-6 ps-8 pt-8">
        <FilterSection />
        <div className="col-span-4">
          <EventList displayMode="list" />
        </div>
      </div>
      <div className="flex justify-center pb-4">
        <Pagination />
      </div>
    </div>
  );
};

export default DiscoverEvent;

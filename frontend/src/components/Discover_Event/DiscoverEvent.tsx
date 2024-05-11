import React from "react";
import EventList from "./EventList";
import FilterSection from "./FilterSection";
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
      <Pagination />
    </div>
  );
};

export default DiscoverEvent;

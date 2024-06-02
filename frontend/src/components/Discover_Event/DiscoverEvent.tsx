import React from "react";
import EventList from "./EventList";
import FilterSection from "./FilterSection";
import Pagination from "./Pagination";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const DiscoverEvent: React.FC = () => {
  const location = useLocation();
  const [params, setParams] = useState("");
  console.log(location);
  return (
    <div>
      <div className="grid grid-cols-6 ps-8 pt-8">
        <FilterSection setParamsFromParent={setParams} />
        <div className="col-span-4">
          <EventList
            paramsFromParent={params}
            stateFromParent={location.state}
          />
        </div>
      </div>
      <Pagination />
    </div>
  );
};

export default DiscoverEvent;

import React from "react";
import EventList from "./EventList";
import FilterSection from "./FilterSection";
import Pagination from "./Pagination";
// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

const DiscoverEvent: React.FC = () => {
  // const [params, setParams] = useState("");
  // const location = useLocation();
  // console.log(location.search)
  // useEffect( () => {
  //   console.log("location.search", location.search)
  // }, [location.search])
  // // const [params, setParams] = useState("");
  // console.log(location);
  return (
    <div>
      <div className="grid grid-cols-6 ps-8 pt-8">
        <FilterSection />
        <div className="col-span-4">
          <EventList />
        </div>
      </div>
      <Pagination />
    </div>
  );
};

export default DiscoverEvent;

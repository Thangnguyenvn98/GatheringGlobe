import React from "react";
// import HeroSection from "./HeroSection";
// import NavigationButtons from "./NavigationButtons";
// import EventList from "./EventList";
// import FilterSection from "./FilterSection";
// import Pagination from "./Pagination";
import EventDetail from "./EventDetail";

const App: React.FC = () => {
  return (
    <div>
      {/* <HeroSection />
      {/* <Countdown /> */}
      {/* <EventDetail /> */}
      {/* <NavigationButtons />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FilterSection />
        </div>
        <div>
          <EventList displayMode="list" />
        </div>
      </div> */}
      {/* <div className=" inset-x-0 bottom-0 flex justify-center pb-4 w-full ">
        <Pagination /> */}
      {/* </div>  */}
      <EventDetail />
    </div>
  );
};

export default App;

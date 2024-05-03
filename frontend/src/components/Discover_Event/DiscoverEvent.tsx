import HeroSection from "./HeroSection";
import NavigationButtons from "./NavigationButtons";
import EventList from "./EventList";
import FilterSection from "./FilterSection";
import Pagination from "./Pagination";

const DiscoverEvent = () => {
  return (
    <div>
      <HeroSection />
      <NavigationButtons />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FilterSection />
        </div>
        <div>
          <EventList displayMode="list" />
        </div>
      </div>
      <div className=" inset-x-0 bottom-0 flex justify-center pb-4 w-full ">
        <Pagination />
      </div>
    </div>
  );
};

export default DiscoverEvent;

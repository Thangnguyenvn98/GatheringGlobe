import HeroSection from "./HeroSection";
import NavigationButtons from "./NavigationButtons";
import EventList from "./EventList";
import FilterSection from "./FilterSection";
import Pagination from "./Pagination";

const App = () => {
  const eventData = [
    {
      id: "1",
      title: "Summer Music Festival",
      description: "Join us for an amazing day of music and fun!",
      startTime: "2021-08-01T12:00:00Z",
      endTime: "2021-08-01T22:00:00Z",
      artistName: "DJ Example",
      imageUrls: ["https://example.com/image.jpg"],
      location: "Downtown Park",
    },
    {
      id: "2",
      title: "Local Art Exhibition",
      description: "Experience stunning artworks from local artists.",
      startTime: "2021-08-05T09:00:00Z",
      endTime: "2021-08-05T18:00:00Z",
      artistName: "Art Collective",
      imageUrls: ["https://example.com/art.jpg"],
      location: "City Art Gallery",
    },
  ];
  return (
    <div>
      <HeroSection />
      <NavigationButtons />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FilterSection />
        </div>
        <div>
          <EventList events={eventData} displayMode="list" />
        </div>
      </div>
      <div className=" inset-x-0 bottom-0 flex justify-center pb-4 w-full ">
        <Pagination />
      </div>
    </div>
  );
};

export default App;

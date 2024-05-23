import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
// import { EventType } from "@/types/event";
// import queryString from "query-string";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

const FilterSection = () => {
  // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
  // const navigate = useNavigate();

  const categories = [
    "All event categories",
    "Music",
    "Movies",
    "Books",
    "Sports",
    "Technology",
    "Travel",
    "Food",
    "Fashion",
    "Art",
    "Science",
    "Politics",
    "History",
    "Education",
    "Health",
    "Finance",
    "Gaming",
    "Lifestyle",
    "Parenting",
    "Pets",
    "Gardening",
  ];
  const eventTypes = [
    "All event types",
    "Party",
    "Conference",
    "Concert",
    "Festival",
    "Seminar",
    "Workshop",
    "Meetup",
    "Networking",
    "Exhibition",
    "Tradeshow",
    "Convention",
    "Summit",
    "Gala",
    "Fundraiser",
    "Awards",
    "Screening",
    "Premiere",
    "Launch",
    "Fair",
    "Expo",
    "Charity",
    "Sports",
    "Competition",
    "Tournament",
    "Hackathon",
    "Webinar",
    "Virtual Event",
    "Livestream",
    "Auction",
    "Sale",
    "Open House",
    "Tour",
    "Tasting",
    "Masterclass",
    "Retreat",
    "Camp",
    "Cruise",
    "Rally",
    "Parade",
    "Marathon",
  ];
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showEventType, setShowEventType] = useState(false);
  // const [priceMin, setPriceMin] = useState("");
  // const [priceMax, setPriceMax] = useState("");
  // const [eventCat, setEventCat] = useState("All event categories");
  // const [eventType, setEventType] = useState("All event types");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [inputs, setInputs] = useState({
    priceMin: "",
    priceMax: "",
    eventCat: "All event categories",
    eventType: "All event types",
    date: date,
  });

  // Handle the change in input
  const handleInputChange = async (event: any) => {
    const { name, value } = event.target;
    console.log(event.target);
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log(inputs);
  };

  return (
    <div className="filter-section-container relative font-bold">
      <h1 className="size-10 text-4xl mx-0 my-7">Filter</h1>
      <div className=" top-[152px] bottom-7">
        <div className="">
          <Button
            onClick={() => setShowCategory(!showCategory)}
            className="bg-transparent border-none p-0 shadow-none hover:bg-transparent mx-0 text-[12pt] text-black font-bold"
          >
            Category
          </Button>
          {showCategory && (
            <ScrollArea className="h-72 border-none mx-5">
              {categories.map((cat, _) => (
                <div>
                  <input
                    type="radio"
                    name="eventCat"
                    id={cat}
                    value={cat}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <label className="font-bold p-2" htmlFor={cat}>
                    {cat}
                  </label>
                </div>
              ))}
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          )}
        </div>
        <h3 className="mt-3">Date</h3>
        <div className="mx-5">
          <div>
            <input
              type="radio"
              name="date"
              id="today"
              key="today"
              onClick={() => setShowCalendar(false)}
            />
            <label className="font-bold p-2" htmlFor="today">
              Today
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="date"
              id="tomorrow"
              key="tomorrow"
              onClick={() => setShowCalendar(false)}
            />
            <label className="font-bold p-2" htmlFor="tomorrow">
              Tomorrow
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="date"
              id="this-weekend"
              key="this-weekend"
              onClick={() => setShowCalendar(false)}
            />
            <label className="font-bold p-2" htmlFor="this-weekend">
              This weekend
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="dateshow"
              id="pick-date"
              key="pick-date"
              onClick={() => setShowCalendar(!showCalendar)}
            />
            <label className="font-bold p-2" htmlFor="pick-date">
              Pick a date...
            </label>
            {showCalendar && (
              <div className="left-0">
                <Calendar
                  className="left-0"
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                />
              </div>
            )}
          </div>
        </div>
        <div>
          <label className="font-bold p-2" htmlFor="priceMin">
            Min Price
          </label>
          <input
            type="number"
            name="priceMin"
            key="free"
            id="priceMin"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <label className="font-bold p-2" htmlFor="priceMax">
            Max Price
          </label>
          <input
            type="number"
            name="priceMax"
            key="paid"
            id="priceMax"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className=" top-[152px] bottom-7">
          <div className="mt-3">
            <Button
              onClick={() => setShowEventType(!showEventType)}
              className="bg-transparent border-none p-0 shadow-none hover:bg-transparent mx-0 text-[12pt] text-black font-bold"
            >
              Event Type
            </Button>
            {showEventType && (
              <ScrollArea className="h-72 border-none mx-5">
                {eventTypes.map((type, _) => (
                  <div>
                    <input
                      type="radio"
                      name="eventType"
                      id={type}
                      value={type}
                      onChange={(e) => handleInputChange(e)}
                    />
                    <label className="font-bold p-2" htmlFor={type}>
                      {type}
                    </label>
                  </div>
                ))}
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
//htmlFor helps matching the label to the radio button so clciking on the label instead of the button also work
export default FilterSection;

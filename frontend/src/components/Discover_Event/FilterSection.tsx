import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";

const FilterSection = () => {
  const categories = [
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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCatergory, setShowCatergory] = useState(false);
  const [showEventType, setShowEventType] = useState(false);

  return (
    <div className="filter-section-container relative font-bold">
      <h1 className="size-10 text-4xl mx-0 my-7">Filter</h1>
      <div className=" top-[152px] bottom-7">
        <div className="">
          <Button
            onClick={() => setShowCatergory(!showCatergory)}
            className="bg-transparent border-none p-0 shadow-none hover:bg-transparent mx-0 text-[12pt] text-black font-bold"
          >
            Catergory
          </Button>
          {showCatergory && (
            <ScrollArea className="h-72 border-none mx-5">
              {categories.map((cat, index) => (
                <div>
                  <input type="checkbox" name="date" id={String(index)} />
                  <label className="font-bold p-2" htmlFor={String(index)}>
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
              name="date"
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
        <h3 className="mt-3">Price</h3>
        <div className="mx-5">
          <div>
            <input type="radio" name="price" key="free" id="free" />
            <label className="font-bold p-2" htmlFor="free">
              Free
            </label>
          </div>
          <div>
            <input type="radio" name="price" key="paid" id="paid" />
            <label className="font-bold p-2" htmlFor="paid">
              Paid
            </label>
          </div>
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
                {eventTypes.map((type, index) => (
                  <div>
                    <input type="checkbox" name="date" id={String(index)} />
                    <label className="font-bold p-2" htmlFor={String(index)}>
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

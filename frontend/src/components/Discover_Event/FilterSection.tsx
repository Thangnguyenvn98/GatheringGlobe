import { useState, useEffect } from "react";
import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import DatePickerWithRange from "./date-picker-with-two-range";
import { DateRange } from "react-day-picker";
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { useRef } from "react";

const FilterSection = () => {
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
  const firstUpdate = useRef(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCategory, setShowCategory] = useState(false);
  const [showEventType, setShowEventType] = useState(false);
  let startTimeFromParams = searchParams.get("startTime");
  let endTimeFromParams = searchParams.get("endTime");
  let dateFromParams: DateRange;
  const [date, setDate] = React.useState<DateRange | undefined>();
  if (startTimeFromParams) {
    dateFromParams = {
      from: new Date(decodeURIComponent(startTimeFromParams)),
      to: new Date(
        decodeURIComponent(
          endTimeFromParams ? endTimeFromParams : startTimeFromParams,
        ),
      ),
    };
    if (String(dateFromParams) !== String(date)) {
      setDate(dateFromParams);
    }
  }

  const [priceMin, setPriceMin] = useState(
    searchParams.get("priceMin") ? searchParams.get("priceMin") : "",
  );
  const [priceMax, setPriceMax] = useState(
    searchParams.get("priceMax") ? searchParams.get("priceMax") : "",
  );
  const [category, setCategory] = useState(
    searchParams.get("category") ? searchParams.get("category") : "",
  );
  const [eventType, setEventType] = useState(
    searchParams.get("eventType") ? searchParams.get("eventType") : "",
  );
  useEffect(() => {
    if (firstUpdate.current < 2) {
      firstUpdate.current = firstUpdate.current + 1;
      return;
    }
    if (priceMin !== "") {
      searchParams.set(
        "priceMin",
        queryString.stringify({ priceMin }, { encode: true }).slice(8),
      );
    } else {
      searchParams.delete("priceMin");
    }
    if (priceMax !== "") {
      searchParams.set(
        "priceMax",
        queryString.stringify({ priceMax }, { encode: true }).slice(8),
      );
    } else {
      searchParams.delete("priceMax");
    }
    if (category !== "" && category !== "All event categories") {
      searchParams.set(
        "category",
        queryString.stringify({ category }, { encode: false }).slice(9),
      );
    } else {
      searchParams.delete("category");
    }
    if (eventType !== "All event types" && eventType !== "") {
      searchParams.set(
        "eventType",
        queryString.stringify({ eventType }, { encode: true }).slice(12),
      );
    } else {
      searchParams.delete("eventType");
    }
    if (date && date.from) {
      searchParams.set(
        "startTime",
        queryString
          .stringify({ endDate: date.from.toISOString() }, { encode: true })
          .slice(8),
      );
    } else {
      searchParams.delete("startTime");
    }
    if (date && date.to) {
      searchParams.set(
        "endTime",
        queryString
          .stringify({ endDate: date.to.toISOString() }, { encode: true })
          .slice(8),
      );
    } else {
      searchParams.delete("endTime");
    }
    searchParams.delete("page");
    setSearchParams(searchParams);
  }, [category, eventType, priceMin, priceMax, date]);

  return (
    <div className="relative font-bold">
      <h1 className="size-10 text-4xl mx-0 my-7">Filter</h1>
      <div className=" top-[152px] bottom-7">
        <div className="">
          <Button
            onClick={() => setShowCategory(!showCategory)}
            className="bg-transparent border-none p-0 shadow-none hover:bg-transparent mx-0 text-[12pt] text-black font-bold hover:underline"
          >
            Category
          </Button>
          {showCategory && (
            <ScrollArea className="h-72 border-none mx-5">
              {categories.map((cat, _) => (
                <div key={cat}>
                  <input
                    type="radio"
                    name="category"
                    id={cat}
                    value={cat}
                    checked={cat == category ? true : false}
                    onChange={(event) => setCategory(event.target.value)}
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
        <div className="my-2">
          <DatePickerWithRange
            setDateFromParent={setDate}
            dateFromParent={date}
          />
        </div>
        <div>
          <label className="font-bold hover:underline" htmlFor="priceMin">
            Min Price
          </label>
          <input
            type="number"
            name="priceMin"
            key="free"
            id="priceMin"
            value={priceMin ? priceMin : ""}
            onChange={(e) => setPriceMin(e.target.value)}
            style={{
              marginLeft: "20px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "4px 8px",
              fontWeight: "normal",
              outline: "none", // Remove the default outline on focus
            }}
            onBlur={(e) => (e.target.style.borderWidth = "1px")}
          />
        </div>
        <div>
          <label className="font-bold hover:underline" htmlFor="priceMax">
            Max Price
          </label>
          <input
            type="number"
            name="priceMax"
            key="paid"
            id="priceMax"
            value={priceMax ? priceMax : ""}
            onChange={(e) => setPriceMax(e.target.value)}
            style={{
              marginLeft: "20px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "4px 8px",
              fontWeight: "normal",
              outline: "none", // Remove the default outline on focus
            }}
            onBlur={(e) => (e.target.style.borderWidth = "1px")}
          />
        </div>
        <div className=" top-[152px] bottom-7">
          <div className="mt-3">
            <Button
              onClick={() => setShowEventType(!showEventType)}
              className="bg-transparent border-none p-0 shadow-none hover:bg-transparent mx-0 text-[12pt] text-black font-bold hover:underline"
            >
              Event Type
            </Button>
            {showEventType && (
              <ScrollArea className="h-72 border-none mx-5">
                {eventTypes.map((type, _) => (
                  <div key={type}>
                    <input
                      type="radio"
                      name="eventType"
                      id={type}
                      value={type}
                      checked={type == eventType ? true : false}
                      onChange={(e) => setEventType(e.target.value)}
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
export default FilterSection;

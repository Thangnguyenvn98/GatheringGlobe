import { useState, useEffect } from "react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import DatePickerWithRange from "./date-picker-with-two-range";
import { DateRange } from "react-day-picker";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";

const FilterSection = () => {
  const categories = [
    "All event categories",
    "Music",
    "Movies",
    "Books",
    "Sports",
  ];
  const categoriesSeeMore = [
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
  ];
  const eventTypesSeeMore = [
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
  const sortOptions = [
    "Soonest",
    "Latest",
    "Price low to high",
    "Price high to low",
  ];

  const firstUpdate = useRef(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCategory, setShowCategory] = useState(false);
  const [showEventType, setShowEventType] = useState(false);
  const [priceMin, setPriceMin] = useState(searchParams.get("priceMin") || "");
  const [priceMax, setPriceMax] = useState(searchParams.get("priceMax") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [eventType, setEventType] = useState(
    searchParams.get("eventType") || "",
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  useEffect(() => {
    console.log("sort changed");
    if (sort) {
      searchParams.set("sort", sort);
    } else {
      searchParams.delete("sort");
    }
    setSearchParams(searchParams);
  }, [sort]);

  const [date, setDate] = React.useState<DateRange | undefined>();
  useEffect(() => {
    let startTimeFromParams = searchParams.get("startTime");
    let endTimeFromParams = searchParams.get("endTime");

    if (startTimeFromParams) {
      const dateFromParams = {
        from: new Date(decodeURIComponent(startTimeFromParams)),
        to: new Date(
          decodeURIComponent(endTimeFromParams || startTimeFromParams),
        ),
      };
      if (String(dateFromParams) !== String(date)) {
        setDate(dateFromParams);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (firstUpdate.current < 2) {
      firstUpdate.current += 1;
      return;
    }

    if (priceMin) searchParams.set("priceMin", priceMin);
    else searchParams.delete("priceMin");

    if (priceMax) searchParams.set("priceMax", priceMax);
    else searchParams.delete("priceMax");

    if (category && category !== "All event categories")
      searchParams.set("category", category);
    else searchParams.delete("category");

    if (eventType && eventType !== "All event types")
      searchParams.set("eventType", eventType);
    else searchParams.delete("eventType");

    if (date?.from) searchParams.set("startTime", date.from.toISOString());
    else searchParams.delete("startTime");

    if (date?.to) searchParams.set("endTime", date.to.toISOString());
    else searchParams.delete("endTime");

    searchParams.delete("page");
    console.log("page", searchParams.get("page"));
    setSearchParams(searchParams);
  }, [category, eventType, priceMin, priceMax, date]);
  console.log(category);

  return (
    <div className="relative font-bold flex-col">
      <h3>Sort by</h3>
      <div className="border-none mx-5">
        {sortOptions.map((sortOption, _) => (
          <div key={sortOption} className="">
            <input
              type="radio"
              name="sortegory"
              id={sortOption}
              value={sortOption}
              checked={sortOption === sort}
              onChange={(event) => setSort(event.target.value)}
            />
            <label className="font-light p-2" htmlFor={sortOption}>
              {sortOption}
            </label>
          </div>
        ))}
      </div>
      {/* <h1 className="size-10 text-4xl mx-0 my-7">Filter</h1> */}
      <div className=" top-[152px] bottom-7">
        <h3>Categories</h3>
        <div className="border-none mx-5">
          {categories.map((cat, _) => (
            <div key={cat}>
              <input
                type="radio"
                name="category"
                id={cat}
                value={cat}
                checked={cat === category}
                onChange={(event) => setCategory(event.target.value)}
              />
              <label className="font-light p-2" htmlFor={cat}>
                {cat}
              </label>
            </div>
          ))}
        </div>
        {showCategory ? (
          <Button
            onClick={() => setShowCategory(!showCategory)}
            className="bg-transparent place-items-end p-0 shadow-none hover:bg-transparent mx-0 text-[12pt] text-grey-800"
          >
            See More
          </Button>
        ) : (
          <div className="border-none mx-5">
            {categoriesSeeMore.map((cat, _) => (
              <div key={cat}>
                <input
                  type="radio"
                  name="category"
                  id={cat}
                  value={cat}
                  checked={cat === category}
                  onChange={(event) => setCategory(event.target.value)}
                />
                <label className="font-light p-2" htmlFor={cat}>
                  {cat}
                </label>
              </div>
            ))}
            <Button
              onClick={() => setShowCategory(!showCategory)}
              className="bg-transparent place-items-end p-0 shadow-none hover:bg-transparent mx-0 text-[12pt] text-grey-800 hover:underline"
            >
              See less
            </Button>
          </div>
        )}
        <div className="my-2">
          <DatePickerWithRange
            setDateFromParent={setDate}
            dateFromParent={date}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="priceMin">
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
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="priceMax">
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
        <h3>Event Types</h3>
        <div className="border-none mx-5">
          {eventTypes.map((type, _) => (
            <div key={type}>
              <input
                type="radio"
                name="eventTypes"
                id={type}
                value={type}
                checked={type === eventType}
                onChange={(event) => setEventType(event.target.value)}
              />
              <label className="font-light p-2" htmlFor={type}>
                {type}
              </label>
            </div>
          ))}
        </div>
        {showEventType ? (
          <Button
            onClick={() => setShowEventType(!showEventType)}
            className="bg-transparent place-items-end p-0 shadow-none hover:bg-transparent mx-0 text-[12pt] text-grey-800 hover:underline"
          >
            See More
          </Button>
        ) : (
          <div className="border-none mx-5">
            {eventTypesSeeMore.map((type, _) => (
              <div key={type}>
                <input
                  type="radio"
                  name="eventTypes"
                  id={type}
                  value={type}
                  checked={type === eventType}
                  onChange={(event) => setEventType(event.target.value)}
                />
                <label className="font-light p-2" htmlFor={type}>
                  {type}
                </label>
              </div>
            ))}
            <Button
              onClick={() => setShowEventType(!showEventType)}
              className="bg-transparent place-items-end p-0 shadow-none hover:bg-transparent mx-0 text-[12pt] text-grey-800 hover:underline"
            >
              See less
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default FilterSection;

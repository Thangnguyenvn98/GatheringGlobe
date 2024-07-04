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
  const [showCategory, setShowCategory] = useState(true);
  const [showEventType, setShowEventType] = useState(true);
  const [priceMin, setPriceMin] = useState(searchParams.get("priceMin") || "");
  const [priceMax, setPriceMax] = useState(searchParams.get("priceMax") || "");
  const [limit, setLimit] = useState(searchParams.get("limit") || "");
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

    if (limit) searchParams.set("limit", limit);
    else searchParams.delete("limit");

    searchParams.delete("page");
    console.log("page", searchParams.get("page"));
    setSearchParams(searchParams);
  }, [category, eventType, priceMin, priceMax, date, limit]);
  console.log(category);

  return (
    <div className="h-full w-full bg-white  p-5 px-10 space-y-4">
      <h1 className="size-10 text-4xl mx-0 my-7 font-bold">Filter</h1>
      <div>
        <h3 className="font-bold">Sort by</h3>
        <div className="border-none mx-5">
          {sortOptions.map((sortOption, _) => (
            <div key={sortOption} className="flex flex-col">
              <div className="flex items-center gap-x-2">
                <input
                  type="radio"
                  name="sortegory"
                  className="scale-radio"
                  id={sortOption}
                  value={sortOption}
                  checked={sortOption === sort}
                  onChange={(event) => setSort(event.target.value)}
                />
                <label className="font-light p-[0.2rem]" htmlFor={sortOption}>
                  {sortOption}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <h3 className="font-bold">Categories</h3>
        <div className="border-none mx-5">
          {categories.map((cat, _) => (
            <div key={cat} className="flex flex-col">
              <div className="flex items-center gap-x-2">
                <input
                  type="radio"
                  name="category"
                  className="scale-radio"
                  id={cat}
                  value={cat}
                  checked={cat === category}
                  onChange={(event) => setCategory(event.target.value)}
                />
                <label className="font-light p-[0.2rem]" htmlFor={cat}>
                  {cat}
                </label>
              </div>
            </div>
          ))}
        </div>
        {showCategory ? (
          <Button
            onClick={() => setShowCategory(!showCategory)}
            className="bg-transparent text-[12pt] mx-5 place-items-end p-0 left-2 shadow-none hover:bg-transparent hover:underline text-grey-800"
          >
            See More
          </Button>
        ) : (
          <div className="border-none mx-5">
            {categoriesSeeMore.map((cat, _) => (
              <div key={cat} className="flex flex-col">
                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    name="category"
                    className="scale-radio"
                    id={cat}
                    value={cat}
                    checked={cat === category}
                    onChange={(event) => setCategory(event.target.value)}
                  />
                  <label className="font-light p-[0.2rem]" htmlFor={cat}>
                    {cat}
                  </label>
                </div>
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
        <div className="my-2 w-64">
          <DatePickerWithRange
            setDateFromParent={setDate}
            dateFromParent={date}
          />
        </div>
        <div className="flex flex-col w-64 mt-4">
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
        <div className="flex flex-col w-64 mt-4">
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
        <h3 className="font-bold mt-4">Event Types</h3>
        <div className="border-none mx-5">
          {eventTypes.map((type, _) => (
            <div key={type} className="flex flex-col">
              <div className="flex items-center gap-x-2">
                <input
                  type="radio"
                  name="eventTypes"
                  id={type}
                  value={type}
                  className="scale-radio"
                  checked={type === eventType}
                  onChange={(event) => setEventType(event.target.value)}
                />
                <label className="font-light p-[0.2rem]" htmlFor={type}>
                  {type}
                </label>
              </div>
            </div>
          ))}
        </div>
        {showEventType ? (
          <Button
            onClick={() => setShowEventType(!showEventType)}
            className="bg-transparent text-[12pt] mx-5 place-items-end p-0 shadow-none hover:bg-transparent text-grey-800 hover:underline"
          >
            See More
          </Button>
        ) : (
          <div className="border-none mx-5">
            {eventTypesSeeMore.map((type, _) => (
              <div key={type} className="flex flex-col">
                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    name="eventTypes"
                    id={type}
                    value={type}
                    checked={type === eventType}
                    onChange={(event) => setEventType(event.target.value)}
                  />
                  <label className="font-light p-[0.2rem]" htmlFor={type}>
                    {type}
                  </label>
                </div>
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
        <div className="flex flex-col w-64">
          <label className="font-bold" htmlFor="limit">
            Limit number events shown
          </label>
          <input
            type="number"
            name="limit"
            key="limit"
            id="limit"
            value={limit ? limit : ""}
            onChange={(e) => setLimit(e.target.value)}
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
      </div>
    </div>
  );
};
export default FilterSection;

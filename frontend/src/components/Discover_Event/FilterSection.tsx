import { useState, useEffect } from "react";
import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import DatePickerWithRange from "./date-picker-with-two-range";
import { DateRange } from "react-day-picker";
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";

const FilterSection = ({
  setParamsFromParent,
}: {
  setParamsFromParent: any;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("priceMin"));
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
      console.log("dateFromParams", dateFromParams);
      console.log("date", date);
      setDate(dateFromParams);
    }
  }
  // if (  startTimeFromParams!== queryString
  //         .stringify({ startDate: date?.from?.toISOString() }, { encode: true })
  //         .slice(10) ||
  //       endTimeFromParams !== queryString
  //         .stringify({ endDate: date?.to?.toISOString() }, { encode: true })
  //         .slice(8)){

  //   let dateFromParams:DateRange = {from: new Date(startTimeFromParams)
  // , to: new Date(endTimeFromParams? endTimeFromParams:startTimeFromParams)}
  //   setDate(dateFromParams);
  // }
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
    let params = [];
    if (priceMin !== "") {
      params.push(queryString.stringify({ priceMin }, { encode: true }));
    }
    if (priceMax !== "") {
      params.push(queryString.stringify({ priceMax }, { encode: true }));
    }
    if (category !== "" && category !== "All event categories") {
      params.push(queryString.stringify({ category }, { encode: true }));
    }
    if (eventType !== "All event types" && eventType !== "") {
      params.push(queryString.stringify({ eventType }, { encode: true }));
    }
    if (date && date.from) {
      params.push(
        "startTime=" +
          queryString
            .stringify({ startDate: date.from.toISOString() }, { encode: true })
            .slice(10),
      );
    }
    if (date && date.to) {
      params.push(
        "endTime=" +
          queryString
            .stringify({ endDate: date.to.toISOString() }, { encode: true })
            .slice(8),
      );
    }
    const finalParams = params.join("&");
    setParamsFromParent(finalParams);
    setSearchParams(finalParams);
    // }, [category, eventType, priceMin, priceMax]);
  }, [category, eventType, priceMin, priceMax, date]);

  useEffect(() => {
    console.log(searchParams.get("category"));
    console.log(searchParams.get("eventType"));
    console.log(searchParams.get("priceMin"));
    console.log(searchParams.get("priceMax"));
    console.log(searchParams.get("date"));
  }, [searchParams]);

  return (
    <div className="filter-section-container relative font-bold">
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

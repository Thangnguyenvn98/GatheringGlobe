import "./FilterSection.css"; // Make sure to create the corresponding CSS file
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "../../ui/button";

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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCatergory, setshowCatergory] = useState(false);
  const calendarRef = useRef(null);
  const catergoryRef = useRef(null);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const catergoryShow = () => {
    setshowCatergory(!showCatergory);
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !(calendarRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
      if (
        catergoryRef.current &&
        !(catergoryRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setshowCatergory(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarRef, catergoryRef]);

  return (
    <div className="filter-section-container relative">
      <div className=" filter-section top-[152px] bottom-7">
        <p>Filter</p>
        <div className="filter-catergory">
          <Button
            onClick={catergoryShow}
            className="bg-transparent border-none p-0 shadow-none hover:bg-transparent mx-0 text-[12pt] text-black"
          >
            Catergory
          </Button>
          {showCatergory && (
            <ScrollArea ref={catergoryRef} className="h-72 rounded-md border">
              {categories.map((cat, index) => (
                <div>
                  <input type="checkbox" name="date" id={String(index)} />
                  <label htmlFor={String(index)} key={index}>
                    {cat}
                  </label>
                </div>
              ))}
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          )}

          {/* <div>
            <input type="checkbox" id="business" />
            <label htmlFor="business">Business</label>
          </div>
          <div>
            <input type="checkbox" id="food-drink" />
            <label htmlFor="food-drink">Food & Drink</label>
          </div>
          <div>
            <input type="checkbox" id="health" />
            <label htmlFor="health">Health</label>
          </div>
          <div>
            <input type="checkbox" id="music" />
            <label htmlFor="music">Music</label>
          </div> */}
        </div>
        <div className="filter-date">
          <h3>Date</h3>
          <div>
            <input type="radio" name="date" id="today" />
            <label htmlFor="today">Today</label>
          </div>
          <div>
            <input type="radio" name="date" id="tomorrow" />
            <label htmlFor="tomorrow">Tomorrow</label>
          </div>
          <div>
            <input type="radio" name="date" id="this-weekend" />
            <label htmlFor="this-weekend">This weekend</label>
          </div>
          <div>
            <input
              type="radio"
              name="date"
              id="pick-date"
              onClick={toggleCalendar}
            />
            <label htmlFor="pick-date">Pick a date...</label>
            {showCalendar && (
              <div ref={calendarRef}>
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </div>
            )}
          </div>
        </div>
        <div className="filter-price">
          <h3>Price</h3>
          <div>
            <input type="radio" name="price" id="free" />
            <label htmlFor="free">Free</label>
          </div>
          <div>
            <input type="radio" name="price" id="paid" />
            <label htmlFor="paid">Paid</label>
          </div>
        </div>
        <div className="filter-format">
          <h3>Format</h3>
          <div>
            <input type="radio" name="format" id="class" />
            <label htmlFor="class">Class</label>
          </div>
          <div>
            <input type="radio" name="format" id="conference" />
            <label htmlFor="conference">Conference</label>
          </div>
          <div>
            <input type="radio" name="format" id="festival" />
            <label htmlFor="festival">Festival</label>
          </div>
          <div>
            <input type="radio" name="format" id="party" />
            <label htmlFor="party">Party</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;

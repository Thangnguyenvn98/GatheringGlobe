import "./FilterSection.css"; // Make sure to create the corresponding CSS file
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const FilterSection = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !(calendarRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarRef]);

  return (
    <div className="filter-section-container relative">
      <div className=" filter-section fixed bottom-7">
        <p>Filter</p>
        <div className="filter-category">
          <h3>Category</h3>
          <div>
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
          </div>
          <button>View more</button>
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
              <div className="calendar-container" ref={calendarRef}>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
            )}
          </div>
          <button>View more</button>
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

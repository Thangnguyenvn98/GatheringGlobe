import * as React from "react";
import SearchByKeyword from "./keywordsearch";
import DatePickerWithRange from "./date-picker-with-two-range";
import { DateRange } from "react-day-picker";
import EventLocation from "./searchlocation";
import { useState } from "react";
import { Button } from "../ui/button";
import queryString from "query-string";
import axios from "axios";
import { EventType } from "@/types/event";

function SearchForm() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
  const [location, setLocation] = useState("");
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [keyword, setKeyword] = useState("");

  const onSubmit = async () => {
    //create a list of part of the query string with the input to join into 1 query string later, slice the string to get only the part that we need
    const params = [];
    if (location) {
      params.push(
        "locationChosen=" +
          queryString.stringify({ location }, { encode: true }).slice(9),
      );
    }
    if (date && date.from) {
      params.push(
        "startDate=" +
          queryString
            .stringify({ startDate: date.from.toISOString() }, { encode: true })
            .slice(10),
      );
    }
    if (date && date.to) {
      params.push(
        "endDate=" +
          queryString
            .stringify({ endDate: date.to.toISOString() }, { encode: true })
            .slice(8),
      );
    }
    if (keyword !== "") {
      params.push(
        "keyword=" +
          queryString.stringify({ keyword }, { encode: true }).slice(8),
      );
    }
    const finalParams = params.join("&"); //join the strings into one query
    console.log(`${API_BASE_URL}/?${finalParams}`);
    try {
      //axios.get() is a method provided by the Axios library to send a GET request to a specified URL.
      const response = await axios.get(
        `${API_BASE_URL}/api/events/search?${finalParams}`,
      );
      if (response.status === 200) {
        //if the data fetched successfully (status code === 200), navigate to another page
        response.data.forEach((item: EventType) => {
          console.log(item);
        });
      } else if (response.status === 201) {
        //if no matching event found, we dont do the navigate(...) so that there is no error
        console.log("No matching event found");
      }
      // When you have the response navigate the page or refresh the page with the current result, etc ...
      //Based on the response navigate to the site that contain the search results
      //Noted that we currently do not have that page yet
      //So you can test just with response.data to see if we are getting the correct result back
      //You can create fake model by making a post request http://localhost:5050/api/events with the data in the events.ts file
    } catch (error) {
      console.error("Fail to search: ", error);
    }
  };
  return (
    <div className="flex justify-center mb-2 items-center bg-white ">
      <div className="border-r-black border-r-[1px] p-1">
        <EventLocation setLocationFromParent={setLocation} />
      </div>
      <div className="border-r-black border-r-[1px] p-1">
        <DatePickerWithRange setDateFromParent={setDate} />
      </div>
      <SearchByKeyword setKeywordFromParent={setKeyword} />
      <div className="p-1">
        <Button
          type="submit"
          size={"lg"}
          onClick={onSubmit}
          className="bg-green-200  text-green-800 text-lg hover:text-black hover:bg-green-200  font-normal shadow-none "
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchForm;

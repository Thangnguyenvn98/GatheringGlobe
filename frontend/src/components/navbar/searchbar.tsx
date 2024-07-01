import * as React from "react";
import SearchByKeyword from "./keywordsearch";
import DatePickerWithRange from "./date-picker-with-two-range";
import { DateRange } from "react-day-picker";
import EventLocation from "./searchlocation";
import { useState } from "react";
import { Button } from "../ui/button";
import queryString from "query-string";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function SearchForm() {
  const loc = useLocation();
  const [_, setSearchParams] = useSearchParams();
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [location, setLocation] = useState("");
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async () => {
    //create a list of part of the query string with the input to join into 1 query string later, slice the string to get only the part that we need
    const params = [];
    if (location) {
      params.push(
        "location=" +
          queryString.stringify({ location }, { encode: true }).slice(9),
      );
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
    if (keyword !== "") {
      params.push(
        "keyword=" +
          queryString.stringify({ keyword }, { encode: true }).slice(8),
      );
    }
    const finalParams = params.join("&"); //join the strings into one query
    if (loc.pathname == "/discover") {
      console.log(`/discover?${finalParams}`);
      setSearchParams(finalParams);
    } else {
      console.log(`/discover?${finalParams}`);
      navigate(`/discover?${finalParams}`);
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
      <SearchByKeyword setKeywordFromParent={setKeyword} onSubmit={onSubmit} />
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

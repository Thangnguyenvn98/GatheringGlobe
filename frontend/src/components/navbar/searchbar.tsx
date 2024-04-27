import * as React from "react"
import SearchByKeyword from "./keywordsearch";
import {DatePickerWithRange} from "./date-picker-with-range";
import { DateRange } from "react-day-picker"
import EventLocation from "./searchlocation";
import { addDays} from "date-fns"
import {useState} from "react";
import { Button} from "../ui/button"


function SearchForm() {
    const [location, setLocation] = useState("All locations")
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2024, 2, 20),
        to: addDays(new Date(2024, 4, 20), 20),
    })
    const [keyword, setKeyword] = useState("")
    
    const onSubmit:any = () => {
        console.log(location);
        console.log(date);
        console.log(keyword);
    }
    return(
        <div className="flex flex-row justify-center mb-2">
            <EventLocation setLocationFromParent={setLocation}/>
            <DatePickerWithRange setDateFromParent={setDate}/>
            <SearchByKeyword setKeywordFromParent={setKeyword}/>
            <Button type="submit" onClick={onSubmit} className = "flex h-[40px] rounded-none text-green-800 bg-white hover:bg-green-800 hover:text-white font-normal shadow-none">Search</Button>
        </div>
    )
};

export default SearchForm;

import * as React from "react"
import SearchByKeyword from "./keywordsearch";
import DatePickerWithRange from "./date-picker-with-two-range";
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
    
    const onSubmit = () => {
        console.log(location);
        console.log(date);
        console.log(keyword);
    }
    return(
        <div className="flex justify-center mb-2 items-center bg-white ">
            <div className='border-r-black border-r-[1px] p-1'>
            <EventLocation setLocationFromParent={setLocation}/>
            </div>
            <div className='border-r-black border-r-[1px] p-1' >
            <DatePickerWithRange setDateFromParent={setDate}/>
            </div>  
            <SearchByKeyword setKeywordFromParent={setKeyword}/>
            <div className="p-1">
            <Button type="submit" size={"lg"} onClick={onSubmit} className = "bg-green-200  text-green-800 text-lg hover:text-black hover:bg-green-200  font-normal shadow-none ">Search</Button>
            </div>
         
        </div>
    )
}

export default SearchForm;

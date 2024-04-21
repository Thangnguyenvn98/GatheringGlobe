import SearchByKeyword from "./eventsearch";
import {DatePickerWithRange, DatePicked} from "./date-picker-with-range";
import {EventLocation, locationExported} from "./searchlocation";


function SearchForm() {
    console.log(locationExported, DatePicked);
    return( 
        <div className="flex flex-row justify-center mb-2">
            <EventLocation/>
            <DatePickerWithRange/>
            <SearchByKeyword/>
        </div>
    )
};

export default SearchForm
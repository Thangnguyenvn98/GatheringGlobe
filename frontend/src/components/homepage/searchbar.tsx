import SearchByKeyword from "./keywordsearch";
import {DatePickerWithRange} from "./date-picker-with-range";
import {EventLocation} from "./searchlocation";


function SearchForm() {
    return( 
        <div className="flex flex-row justify-center mb-2">
            <EventLocation/>
            <DatePickerWithRange/>
            <SearchByKeyword/>
        </div>
    )
};

export default SearchForm
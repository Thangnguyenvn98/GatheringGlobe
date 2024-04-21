import EventBanner from "../../images/diversity_inclusion1.jpg"
// import {DatePickerDemo} from "./searchdate"
// import { Form } from "./formfooter";
//import * as React from "react"


function Events (){
    return (
        <div className="flex flex-col w-full overflow-hidden">
            <div style={{backgroundImage: `url("${EventBanner}")` }} className="bg-opacity-20 flex flex-col justify-center items-center h-[400px]" >
                {/* <Form /> */}
                {/* <DatePickerDemo /> */}
            </div>
        </div>
    )
}

export default Events;
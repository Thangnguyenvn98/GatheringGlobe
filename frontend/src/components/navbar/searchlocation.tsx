"use client"

import {useState } from 'react';
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { ScrollArea } from "../ui/scroll-area"
import { Button } from "../ui/button"


function EventLocation({setLocationFromParent}:{setLocationFromParent:(value:string)=>void}) {
    const loc = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "San Francisco", "Indianapolis", "Columbus", "Fort Worth", "Charlotte", "Seattle", "Denver", "El Paso", "Detroit", "Washington", "Boston", "Memphis", "Nashville", "Portland", "Oklahoma City", "Las Vegas", "Baltimore", "Louisville"]
    //setlocation is the function called when the event happen
    //state of location object is what chenged
    //"Event Locations" is the initial value of location object
    //locationChosen is triggered when button is click, the value locchosen in the button  is passed in
    //it then trigger setlocation which set location object to the value of locchosen
    const [location, setLocation] = useState("Event Locations") //declare the usestate
    const onSubmit = (loc: string) =>
        {
            setLocationFromParent(loc);
        }
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="w-full bg-transparent">
                    <Button className="bg-white text-green-800 rounded-none h-[40px] hover:bg-green-800 hover:text-white font-normal">{location}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-96 bg-emerald-800">
                        <ScrollArea className="h-[300px] w-full rounded-md border">
                            {loc.map((locchosen, _) => (
                                <DropdownMenuItem className="flex flex-row justify-around">
                                    <Button className = "rounded-none bg-transparent w-full flex text-green-500" type = "submit" onClick={() => {setLocation(locchosen); onSubmit(locchosen);} }>{locchosen}</Button>
                                    {/* when the button is clicked, function locationChsoen is triggered with value of locchosen passed in as parameter */}
                                </DropdownMenuItem>
                            ))}
                        </ScrollArea>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default EventLocation;
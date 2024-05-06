import {useState } from 'react';
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { ScrollArea } from "../ui/scroll-area"
import { Button } from "../ui/button"

var locationExported : string;

function EventLocation () {
    const loc = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "San Francisco", "Indianapolis", "Columbus", "Fort Worth", "Charlotte", "Seattle", "Denver", "El Paso", "Detroit", "Washington", "Boston", "Memphis", "Nashville", "Portland", "Oklahoma City", "Las Vegas", "Baltimore", "Louisville"]
    //setlocation is the function called when the event happen
    //state of location object is what chenged
    //"Event Locations" is the initial value of location object
    //locationChosen is triggered when button is click, the value locchosen in the button  is passed in
    //it then trigger setlocation which set location object to the value of locchosen
    const [location, setlocation] = useState("Event Locations") //declare the usestate
    const locationChosen : any = (locchosen:string) => {
        setlocation(locchosen)
        locationExported = locchosen;
    }
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="w-full bg-transparent">
                    <Button className=" text-green-800 rounded-none h-[40px]">{location}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-96 bg-emerald-800">
                        <ScrollArea className="h-[300px] w-full rounded-md border">
                            {loc.map((locchosen, index) => (
                                <DropdownMenuItem className="flex flex-row justify-around" key={index}>
                                    <Button className = "rounded-none bg-transparent w-full flex text-green-500" onClick={() => locationChosen(locchosen)}>{locchosen}</Button>
                                    {/* when the button is clicked, function locationChsoen is triggered with value of locchosen passed in as parameter */}
                                </DropdownMenuItem>
                            ))}
                        </ScrollArea>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export  {EventLocation, locationExported};
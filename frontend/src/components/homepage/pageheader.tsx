import {DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import GatheringGlobe from '../../images/GatheringGlobe.png'
import SearchForm from "./searchform";

function Pageheader() {
    return( 
    <>
        <div className="flex md:hidden left-0">
        <DropdownMenu>
            <DropdownMenuTrigger className="w-full bg-transparent text-green-800">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
                </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96 bg-emerald-800">
                <DropdownMenuItem className="h-14">Home</DropdownMenuItem>
                <DropdownMenuItem className="h-14">Discover Event</DropdownMenuItem>
                <DropdownMenuItem className="h-14">Community</DropdownMenuItem>
                <DropdownMenuItem className="h-14">About Us</DropdownMenuItem>
                <DropdownMenuItem className="h-14">FAQs</DropdownMenuItem>
                <DropdownMenuItem className="h-14">Log In/Sign Up</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </div>

        <div className=" flex flex-col w-full bg-green-200 fixed bg-opacity-100 z-30">
            <div className = "flex p-2 justify-between w-full text-white items-center">
                <div className="relative p-4 flex items-center">
                    <Button className="bg-transparent shadow-none text-green-800 hover:bg-transparent">
                        <img src={GatheringGlobe} alt="logo" className="h-20 w-20" />
                    </Button>
                </div>
                <div>
                    <Button className="bg-transparent shadow-none text-green-800 hover:bg-transparent hover:text-green-500 hover:underline">
                        Discover
                    </Button>
                    <Button className="bg-transparent shadow-none text-green-800 hover:bg-transparent hover:text-green-500 hover:underline">
                        Community
                    </Button>
                    <Button className="bg-transparent shadow-none text-green-800 hover:bg-transparent hover:text-green-500 hover:underline">
                        About Us
                    </Button>
                    <Button className="bg-transparent shadow-none text-green-800 hover:bg-transparent hover:text-green-500 hover:underline">
                        FAQs
                    </Button>
                </div>
                <Button className="bg-transparent text-green-800 hover:bg-transparent hover:text-green-500 hover:underline" >
                    Log In/Sign up
                </Button>
            </div>
            <div className="flex justify-center">
                <SearchForm/>
            </div>
        </div>
        
    </>
    );
}

export default Pageheader;

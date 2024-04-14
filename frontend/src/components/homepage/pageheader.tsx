import {DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    } from "../ui/dropdown-menu"
import { Button } from "../ui/button"

function Pageheader() {
    return( 
    <div className="p-2">
        <div className="flex md:hidden left-0">
        <DropdownMenu>
            <DropdownMenuTrigger className="w-full bg-transparent text-green-800">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
            </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96 bg-emerald-800">
                <DropdownMenuSeparator />
                <DropdownMenuItem className="h-14">Home</DropdownMenuItem>
                <DropdownMenuItem className="h-14">Discover Event</DropdownMenuItem>
                <DropdownMenuItem className="h-14">Community</DropdownMenuItem>
                <DropdownMenuItem className="h-14">About Us</DropdownMenuItem>
                <DropdownMenuItem className="h-14">FAQs</DropdownMenuItem>
                <DropdownMenuItem className="h-14">Log In/Sign Up</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        </div>
        <div className={`hidden md:flex flex-row mx-0$ {showFullWidthSearch ? "flex" : "hidden md:flex"}`}>
            <div className="flex flex-row items-start">
                <Button className="bg-transparent text-green-800">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" />
                        <path fillRule="evenodd" d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z" clipRule="evenodd" />
                    </svg>

                </Button>
                <Button className="bg-transparent text-green-800">
                    Discover
                </Button>
                <Button className="bg-transparent text-green-800">
                    Community
                </Button>
                <Button className="bg-transparent text-green-800">
                    About Us
                </Button>
                <Button className="bg-transparent text-green-800">
                    FAQs
                </Button>
            </div>
            <Button className="bg-transparent text-green-800" >
                Log In/Sign up
            </Button>
        </div>
    </div>
    );
}
export default Pageheader;

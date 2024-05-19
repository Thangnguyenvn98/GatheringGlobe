import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import GatheringGlobe from "../../images/GatheringGlobe.png";
import SearchForm from "../navbar/searchbar";
import { Link, useNavigate } from "react-router-dom";
import { CircleUserRound, LogOut } from "lucide-react";
import { signOutUser } from "@/services/api";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/services/queries";
import { ShoppingCart } from "lucide-react";
import Cart from "../checkout/Cart";
import useCartStore from "@/hooks/use-cart-store";

function Pageheader() {
  const { data: userData, isLoading, isError } = useCurrentUser();
  const { getTotalQuantity } = useCartStore();
  const totalQuantity = getTotalQuantity();
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      const response = await signOutUser();
      console.log(response.message);
      toast.success(response.message);
      navigate("/", { replace: true });
    } catch (e) {
      console.log(e);
      toast.error("Logout failed");
    }
  };
  return (
    <>
      <div className="flex md:hidden left-0">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full bg-transparent text-green-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
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

      <div className="flex flex-col w-full bg-green-200 fixed bg-opacity-100 z-30 p-4">
        <div className="flex justify-between w-full text-white items-center">
          <div className="relative flex items-center">
            <Link to="/">
              <img src={GatheringGlobe} alt="logo" className="h-20 w-70 pt-4" />
            </Link>
          </div>
          <div className="flex items-center gap-x-4 text-lg font-bold text-green-800">
            <Link to="/discover" className="   hover:text-green-500">
              Discover
            </Link>
            <Link to="/community" className=" hover:text-green-500 ">
              Community
            </Link>
            <Link to="/about" className="    hover:text-green-500 ">
              About Us
            </Link>
            <Link to="/help" className=" hover:text-green-500 ">
              FAQs
            </Link>
          </div>
          <div className="flex items-center gap-x-4">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button className="relative" variant={"outline"}>
                  <ShoppingCart className="h-6 w-6 text-green-800 hover:text-green-500" />
                  {totalQuantity > 0 && (
                    <div className="absolute -top-4 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center">
                      {totalQuantity}
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-90" align="end">
                <Cart />
              </DropdownMenuContent>
            </DropdownMenu>
            {userData && !isLoading && !isError && (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant={"profile"}>
                    <CircleUserRound />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-72">
                  <div>
                    <span className="ml-2 text-muted-foreground">
                      Welcome back!
                    </span>{" "}
                    <DropdownMenuLabel className="text-lg">
                      {userData?.username}
                    </DropdownMenuLabel>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>My Profile</DropdownMenuItem>
                    <DropdownMenuItem>My Tickets</DropdownMenuItem>
                    <DropdownMenuItem>My Settings</DropdownMenuItem>
                    <DropdownMenuItem>My Events</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={signOut}
                    className="text-red-500 font-bold text-lg "
                  >
                    Sign Out
                    <DropdownMenuShortcut className="text-red-500">
                      <LogOut />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {!userData && (
              <Link
                to="/register"
                className="bg-white text-green-800 text-lg p-4 rounded-md mr-2"
              >
                Log In/Sign up
              </Link>
            )}
          </div>
        </div>
        <div className="flex justify-center pb-4">
          <SearchForm />
        </div>
      </div>
    </>
  );
}

export default Pageheader;

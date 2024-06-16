import React, { useState } from "react";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import { useCurrentUser } from "@/services/queries";
const ChevronDownIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

// Added onSelectCategory prop to manage external actions
const SideBar: React.FC<{ onSelectCategory?: (category: string) => void }> = ({
  onSelectCategory,
}) => {
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  // const { data: userData, isLoading, isError } = useCurrentUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const signOut = async () => {
    try {
      const response = await signOutUser();
      console.log(response.message);
      toast.success(response.message);
      queryClient.resetQueries();
      navigate("/", { replace: true });
    } catch (e) {
      console.log(e);
      toast.error("Logout failed");
    }
  };

  // if (isLoading) return <div>Loading...</div>; // Display loading indicator
  // if (isError || !userData) return <div>Error or no user data</div>;

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prevState) => {
      const newSet = new Set(prevState);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleCategorySelection = (category: string) => {
    onSelectCategory?.(category); // Trigger the passed function with the selected category
  };

  return (
    <div className="h-full w-64 bg-white text-blue-800 p-5 space-y-4">
      <h1 className="text-xl font-bold">Ticketmaster</h1>

      <div>
        <button
          className="flex justify-between items-center w-full text-left"
          onClick={() => {
            toggleDropdown("tickets");
            handleCategorySelection("tickets");
          }}
        >
          My Tickets
          <ChevronDownIcon isOpen={openDropdowns.has("tickets")} />
        </button>
        <div
          className={`dropdown-content ${openDropdowns.has("tickets") ? "open" : ""}`}
        >
          <p onClick={() => handleCategorySelection("all-events")}>
            All Events
          </p>
          <p onClick={() => handleCategorySelection("upcoming-events")}>
            Upcoming Events
          </p>
          <p onClick={() => handleCategorySelection("past-events")}>
            Past Events
          </p>
          <p onClick={() => handleCategorySelection("my-listings")}>
            My Listings
          </p>
          <p onClick={() => handleCategorySelection("my-digital-collectibles")}>
            My Digital Collectibles
          </p>
        </div>
      </div>

      <div>
        <button
          className="flex justify-between items-center w-full text-left"
          onClick={() => {
            toggleDropdown("profile");
            handleCategorySelection("profile");
          }}
        >
          My Profile
          <ChevronDownIcon isOpen={openDropdowns.has("profile")} />
        </button>
        <div
          className={`dropdown-content ${openDropdowns.has("profile") ? "open" : ""}`}
        >
          <p onClick={() => handleCategorySelection("profile-details")}>
            Profile Details
          </p>
          <p onClick={() => handleCategorySelection("billing-information")}>
            Billing Information
          </p>
          <p onClick={() => handleCategorySelection("connected-accounts")}>
            Connected Accounts
          </p>
          <p
            onClick={() =>
              handleCategorySelection("accessibility-requirements")
            }
          >
            Accessibility Requirements
          </p>
          <p onClick={() => handleCategorySelection("gift-card-balance")}>
            Gift Card Balance
          </p>
        </div>
      </div>

      <button className="w-full text-red-500 font-bold" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default SideBar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  ChevronDown,
  Ticket,
  Calendar,
  History,
  User,
  CreditCard,
  Link,
  Accessibility,
  Gift,
  LogOut,
  List,
} from "lucide-react"; // Importing Lucide icons

const ChevronDownIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <ChevronDown
    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
  />
);

interface SideBarProps {
  onSelectCategory?: (category: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ onSelectCategory }) => {
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
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
    onSelectCategory?.(category);
  };

  return (
    <div className="h-full w-64 bg-white text-blue-800 p-5 space-y-4">
      <h1 className="text-xl font-bold mb-4">Gathering Globe</h1>

      <div>
        <button
          className="flex justify-between items-center w-full text-left text-lg mb-2"
          onClick={() => toggleDropdown("tickets")}
        >
          <span className="flex items-center">
            <Ticket className="mr-2" /> My Tickets
          </span>
          <ChevronDownIcon isOpen={openDropdowns.has("tickets")} />
        </button>
        <div
          className={`pl-4 ${
            openDropdowns.has("tickets") ? "block" : "hidden"
          }`}
        >
          <p
            className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center"
            onClick={() => handleCategorySelection("my-events-list")}
          >
            <List className="mr-2" /> My Events List
          </p>
          <p
            className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center"
            onClick={() => handleCategorySelection("upcoming-events")}
          >
            <Calendar className="mr-2" /> Upcoming Events
          </p>
          <p
            className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center"
            onClick={() => handleCategorySelection("past-events")}
          >
            <History className="mr-2" /> Past Events
          </p>
        </div>
      </div>

      <div>
        <button
          className="flex justify-between items-center w-full text-left text-lg mb-2"
          onClick={() => toggleDropdown("profile")}
        >
          <span className="flex items-center">
            <User className="mr-2" /> My Profile
          </span>
          <ChevronDownIcon isOpen={openDropdowns.has("profile")} />
        </button>
        <div
          className={`pl-4 ${
            openDropdowns.has("profile") ? "block" : "hidden"
          }`}
        >
          <p
            className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center"
            onClick={() => handleCategorySelection("profile-details")}
          >
            <User className="mr-2" /> Profile Details
          </p>
          <p
            className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center"
            onClick={() => handleCategorySelection("billing-information")}
          >
            <CreditCard className="mr-2" /> Billing Information
          </p>
          <p
            className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center"
            onClick={() => handleCategorySelection("connected-accounts")}
          >
            <Link className="mr-2" /> Connected Accounts
          </p>
          <p
            className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center"
            onClick={() =>
              handleCategorySelection("accessibility-requirements")
            }
          >
            <Accessibility className="mr-2" /> Accessibility Requirements
          </p>
          <p
            className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center"
            onClick={() => handleCategorySelection("gift-card-balance")}
          >
            <Gift className="mr-2" /> Gift Card Balance
          </p>
        </div>
      </div>

      <button
        className="w-full text-red-500 font-bold mt-4 flex items-center"
        onClick={signOut}
      >
        <LogOut className="mr-2" /> Sign Out
      </button>
    </div>
  );
};

export default SideBar;

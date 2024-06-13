// import React, { useState } from "react";
// import "./SideBar.css";

// const ChevronDownIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M6 9l6 6 6-6" />
//   </svg>
// );

// const SideBar: React.FC = () => {
//   const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

//   const toggleDropdown = (id: string) => {
//     setOpenDropdowns((prevState) => {
//       const newSet = new Set(prevState); // Create a copy of the current state
//       if (newSet.has(id)) {
//         newSet.delete(id); // Remove the id if it's already open (close the dropdown)
//       } else {
//         newSet.add(id); // Add the id if it's not open (open the dropdown)
//       }
//       return newSet;
//     });
//   };

//   return (
//     <div className="h-full w-64 bg-blue-800 text-white p-5 space-y-4">
//       <h1 className="text-xl font-bold">Ticketmaster</h1>

//       {/* My Tickets Section */}
//       <div>
//         <button
//           className="flex justify-between items-center w-full"
//           onClick={() => toggleDropdown("tickets")}
//         >
//           My Tickets
//           <ChevronDownIcon isOpen={openDropdowns.has("tickets")} />
//         </button>
//         <div
//           className={`dropdown-content ${openDropdowns.has("tickets") ? "open" : ""}`}
//         >
//           <p>Upcoming Events</p>
//           <p>Past Events</p>
//           <p>My Listings</p>
//           <p>My Digital Collectibles</p>
//         </div>
//       </div>

//       {/* My Profile Section */}
//       <div>
//         <button
//           className="flex justify-between items-center w-full"
//           onClick={() => toggleDropdown("profile")}
//         >
//           My Profile
//           <ChevronDownIcon isOpen={openDropdowns.has("profile")} />
//         </button>
//         <div
//           className={`dropdown-content ${openDropdowns.has("profile") ? "open" : ""}`}
//         >
//           <p>Profile Details</p>
//           <p>Billing Information</p>
//           <p>Connected Accounts</p>
//           <p>Accessibility Requirements</p>
//           <p>Gift Card Balance</p>
//         </div>
//       </div>

//       {/* Other sections... */}

//       {/* Sign Out Button */}
//       <button className="w-full">Sign Out</button>
//     </div>
//   );
// };

// export default SideBar;

import React, { useState } from "react";
import "./SideBar.css";

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

  // Handles category selection, possibly triggering external actions
  const handleCategorySelection = (category: string) => {
    onSelectCategory?.(category);
  };

  return (
    <div className="h-full w-64 bg-white text-blue p-5 space-y-4">
      <h1 className="text-xl font-bold">Ticketmaster</h1>

      <div>
        <button
          className="flex justify-between items-center w-full"
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
          <p onClick={() => handleCategorySelection("upcoming-events")}>
            Upcoming Events
          </p>
          <p onClick={() => handleCategorySelection("past-events")}>
            Past Events
          </p>
          <p>My Listings</p>
          <p>My Digital Collectibles</p>
        </div>
      </div>

      <div>
        <button
          className="flex justify-between items-center w-full"
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
          <p>Profile Details</p>
          <p>Billing Information</p>
          <p>Connected Accounts</p>
          <p>Accessibility Requirements</p>
          <p>Gift Card Balance</p>
        </div>
      </div>

      <button
        className="w-full"
        onClick={() => handleCategorySelection("sign-out")}
      >
        Sign Out
      </button>
    </div>
  );
};

export default SideBar;

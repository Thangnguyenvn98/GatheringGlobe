// import React, { useEffect, useState } from "react";

// interface MainContentProps {
//   category: string;
// }

// interface Event {
//   title: string;
//   _id: string;
//   tickets?: string[]; // Assuming tickets are just IDs for simplicity
// }

// const MainContent: React.FC<MainContentProps> = ({ category }) => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     setIsLoading(true);
//     fetch("/api/allEvents") // Adjusted to the correct endpoint
//       .then((res) => res.json())
//       .then((data) => {
//         if (!data || data.length === 0) {
//           setError("No events found");
//           setIsLoading(false);
//           return;
//         }
//         setEvents(data);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         setError("Failed to fetch data: " + err.message);
//         setIsLoading(false);
//       });
//   }, [category]); // Though category is not used here yet, it might be in future for filtering

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       {events.map((event, index) => (
//         <div key={index}>{event.title}</div>
//       ))}
//     </div>
//   );
// };

// export default MainContent;

import React, { useState, useEffect } from "react";
import EventCard from "../shared/EventCard";
import UserProfile from "../streaming/[username]/UserProfile";
interface Event {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  artistName: string;
  imageUrls: string[];
  location: string;
  _id: string;
}

interface MainContentProps {
  category: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  postalCode: string;
}

const MainContent: React.FC<MainContentProps> = ({ category }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false); // Error state to handle possible fetching issues
  const [user, setUser] = useState<User | null>(null);
  // Fake data arrays for demonstration
  const upcomingEvents: Event[] = [
    {
      title: "Summer Music Festival",
      description:
        "Enjoy the hottest music from top artists from around the world.",
      startTime: "2024-08-01T20:00:00",
      endTime: "2024-08-01T23:00:00",
      artistName: "DJ Example",
      imageUrls: ["https://example.com/upcoming1.jpg"],
      location: "Downtown Arena",
      _id: "1",
    },
    {
      title: "coming2",
      description:
        "Enjoy the hottest music from top artists from around the world.",
      startTime: "2024-08-01T20:00:00",
      endTime: "2024-08-01T23:00:00",
      artistName: "DJ Example",
      imageUrls: ["https://example.com/upcoming1.jpg"],
      location: "Downtown Arena",
      _id: "1",
    },
    // More upcoming events...
  ];

  const pastEvents: Event[] = [
    {
      title: "Historical Concert Evening",
      description: "A night to remember with classics from the 80s and 90s.",
      startTime: "2023-05-01T20:00:00",
      endTime: "2023-05-01T23:00:00",
      artistName: "Retro Sounds",
      imageUrls: ["https://example.com/past1.jpg"],
      location: "Old Town Hall",
      _id: "2",
    },
    {
      title: "past2",
      description:
        "Discover local talents and their artwork at our monthly exhibition.",
      startTime: "2024-09-15T10:00:00",
      endTime: "2024-09-15T17:00:00",
      artistName: "City Art Community",
      imageUrls: ["https://example.com/listing1.jpg"],
      location: "City Gallery",
      _id: "3",
    },
    // More past events...
  ];

  const myListings: Event[] = [
    {
      title: "Local Art Exhibition",
      description:
        "Discover local talents and their artwork at our monthly exhibition.",
      startTime: "2024-09-15T10:00:00",
      endTime: "2024-09-15T17:00:00",
      artistName: "City Art Community",
      imageUrls: ["https://example.com/listing1.jpg"],
      location: "City Gallery",
      _id: "3",
    },
    {
      title: "testall",
      description:
        "Discover local talents and their artwork at our monthly exhibition.",
      startTime: "2024-09-15T10:00:00",
      endTime: "2024-09-15T17:00:00",
      artistName: "City Art Community",
      imageUrls: ["https://example.com/listing1.jpg"],
      location: "City Gallery",
      _id: "3",
    },
    // More listings...
  ];

  const userInfo: User = {
    firstName: "Quynh",
    lastName: "Tran",
    email: "nhuquynhtran_2026@depauw.edu",
    phoneNumber: "123-456-3015",
    country: "United States",
    postalCode: "46135",
  };

  useEffect(() => {
    setIsPending(true);
    setIsError(false); // Reset error state on new category selection

    // Simulate loading data based on category
    setTimeout(() => {
      try {
        if (category === "profile-details") {
          setUser(userInfo); // Set user info if category is 'my-profile'
          setEvents([]); // Clear events when showing profile
        } else {
          setUser(null); // Clear user info when not showing profile
          switch (category) {
            case "upcoming-events":
              setEvents(upcomingEvents);
              break;
            case "past-events":
              setEvents(pastEvents);
              break;
            case "my-listings":
              setEvents(myListings);
              break;
            default:
              setEvents([]);
          }
        }
        setIsPending(false);
      } catch (error) {
        console.error("Error handling data:", error);
        setIsError(true);
        setIsPending(false);
      }
    }, 500); // Reduced delay for quicker response
  }, [category]);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching data.</div>;

  return (
    <div>
      {user ? (
        <UserProfile user={user} />
      ) : (
        events.map((event) => (
          <EventCard
            key={event._id}
            title={event.title}
            description={event.description}
            startTime={new Date(event.startTime).toLocaleString()}
            endTime={new Date(event.endTime).toLocaleString()}
            artistName={event.artistName}
            imageUrls={event.imageUrls}
            location={event.location}
            onClick={() => console.log("Event Clicked:", event.title)}
          />
        ))
      )}
    </div>
  );
};

export default MainContent;

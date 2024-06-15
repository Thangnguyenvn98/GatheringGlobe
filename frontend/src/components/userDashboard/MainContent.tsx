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
    _id: "some_unique_id",
    username: "quynhtran",
    email: "nhuquynhtran_2026@depauw.edu",
    firstName: "Quynh",
    lastName: "Tran",
    phoneNumber: "123-456-3015",
    country: "United States",
    postalCode: "46135",
    password: "your_secure_password", // Include a placeholder or actual hashed password as necessary
    // Optional fields can remain unspecified or null if not used
    stream: undefined, // Assuming 'Stream' is an optional reference to another data model
    imageUrl: undefined, // If you have an image URL, include it here
    bio: undefined, // Include a bio if applicable
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

import React, { useEffect, useState } from "react";

interface MainContentProps {
  category: string;
}

interface Event {
  title: string;
  _id: string;
  tickets?: string[]; // Assuming tickets are just IDs for simplicity
}

const MainContent: React.FC<MainContentProps> = ({ category }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/allEvents") // Adjusted to the correct endpoint
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.length === 0) {
          setError("No events found");
          setIsLoading(false);
          return;
        }
        setEvents(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setIsLoading(false);
      });
  }, [category]); // Though category is not used here yet, it might be in future for filtering

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {events.map((event, index) => (
        <div key={index}>{event.title}</div>
      ))}
    </div>
  );
};

export default MainContent;

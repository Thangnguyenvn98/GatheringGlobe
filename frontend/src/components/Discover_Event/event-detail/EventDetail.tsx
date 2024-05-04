import React, { useState } from "react";

const EventDetail: React.FC = () => {
  // Event details hardcoded directly into the component
  const eventName = "Summer Music Festival";
  const eventImage =
    "https://cluecho.com/wp-content/uploads/2023/04/NCT-DREAM_THE-DREAM-SHOW2_-In-A-DREAM_Newark-Image-3-900x600.jpg";
  const eventLocation = "Central Park, New York City";
  const eventDateTime = "2024-07-16T20:00:00";
  const eventTags = ["Music", "Festival", "Summer", "Live"];
  const ticketPrice = "59.99";

  const [ticketAmount, setTicketAmount] = useState<number>(1);

  const handleTicketAmountChange = (amount: number) => {
    // Ensure that ticket amount is not less than 1
    setTicketAmount((prev) => Math.max(1, prev + amount));
  };

  return (
    <div className="flex flex-col md:flex-row p-6">
      <div className="flex-1">
        <img src={eventImage} alt={eventName} className="rounded-lg mb-4" />
        <h1 className="text-2xl font-bold mb-2">{eventName}</h1>
        <p className="text-gray-600 mb-2">{eventLocation}</p>
        <p className="text-gray-600 mb-2">{eventDateTime}</p>
        <div className="mb-4">
          {eventTags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-semibold mb-2">About this event</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ut
          esse nihil, molestias aperiam, perspiciatis corporis debitis maxime
          porro repellendus veniam tenetur delectus ipsa vel sit perferendis
          maiores facilis a culpa ex placeat nobis voluptates doloribus?
          Nesciunt alias laborum reiciendis ut eveniet, ad ullam consequuntur
          dolor quo a culpa quae earum voluptates architecto fugit? Pariatur
          reiciendis accusantium dolor veniam? Est enim similique numquam,
          molestiae veniam ullam. Maxime non repudiandae animi, distinctio
          quidem cumque magnam asperiores maiores quas nostrum at deleniti. Esse
          eveniet velit ex enim cupiditate veniam a sunt id architecto nulla
          exercitationem officia deleniti aperiam, provident alias? Dolorum,
          reiciendis!
        </p>
      </div>
      <div className="flex-1">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Tickets</h3>
          <div className="flex items-center mb-4">
            <button
              onClick={() => handleTicketAmountChange(-1)}
              className="text-gray-500 focus:outline-none focus:bg-gray-300 p-2 rounded-l-md"
              disabled={ticketAmount <= 1}
              aria-label="Decrease ticket amount"
            >
              -
            </button>
            <span className="flex items-center justify-center bg-white text-black mx-2 p-2">
              {ticketAmount}
            </span>
            <button
              onClick={() => handleTicketAmountChange(1)}
              className="text-gray-500 focus:outline-none focus:bg-gray-300 p-2 rounded-r-md"
              aria-label="Increase ticket amount"
            >
              +
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-800 font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(ticketPrice))}
            </span>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;

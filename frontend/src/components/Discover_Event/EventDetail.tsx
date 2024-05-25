import { useState } from "react";
import { useLocation } from "react-router-dom"; //to call props in event card to the even detail page by clicking the button "view event details"

function EventDetail() {
  const location = useLocation();
  const eventData: any = location.state;

  const [ticketAmount, setTicketAmount] = useState<number>(1);
  const handleTicketAmountChange = (amount: number) => {
    // Ensure that ticket amount is not less than 1
    setTicketAmount((prev) => Math.max(1, prev + amount));
    console.log(ticketAmount);
  };
  return (
    // <div>Nothing to see here</div>
    <div className="flex flex-col md:flex-row p-6">
      <div className="flex-1">
        <img
          src={eventData.imageUrls[0]}
          alt={eventData.title}
          className="rounded-lg mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{eventData.title}</h1>
        <p className="text-gray-600 mb-2">{eventData.location}</p>
        <p className="text-gray-600 mb-2">{eventData.startTime.toString()}</p>
        <p className="text-gray-600 mb-2">{eventData.endTime.toString()}</p>
        <div className="mb-4">
          {eventData.categories?.map((tag: String) => (
            <span
              key={eventData._id}
              className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-semibold mb-2">About this event</h2>
        <p>{eventData.description}</p>
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
            <button
              // onClick={() => onCheckOut(eventData)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;

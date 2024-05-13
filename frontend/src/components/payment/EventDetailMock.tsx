import React from "react";
import { useParams } from "react-router-dom";
import { useCurrentEventDetail } from "@/services/queries";
import { Loader2, ServerCrash } from "lucide-react";
import useCart from "@/hooks/use-cart-store";
import { EventType } from "../../../../backend/src/models/event";

const EventDetailMock: React.FC = () => {
  const eventTags = ["Music", "Festival", "Summer", "Live"];
  const { eventId } = useParams();
  const {
    data: eventData,
    isLoading,
    isError,
  } = useCurrentEventDetail(eventId ?? "");
  const { addToCart, getTotalCost } = useCart();

  if (isLoading) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading event details...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  if (!eventData) {
    return <div>No event data found</div>;
  }

  const onCheckOut = (eventData: EventType) => {
    const updatedEventData = {
      ...eventData,
      tickets: eventData.tickets.map(
        (ticket: (typeof eventData.tickets)[number]) => {
          const quantity = ticketQuantities[ticket.type] || 0;
          const totalPrice = (ticket.price || 0) * quantity;
          return {
            ...ticket,
            totalPrice,
          };
        },
      ),
    };

    const totalCost = updatedEventData.tickets.reduce(
      (acc: number, ticket: (typeof updatedEventData.tickets)[number]) =>
        acc + (ticket.totalPrice || 0),
      0,
    );

    console.log("Checkout with total cost:", totalCost);
    // Implement your checkout logic here
  };
  return (
    <div className="flex flex-col md:flex-row p-6">
      <div className="flex-1">
        <img
          src={eventData.imageUrls[0]}
          alt={eventData.title}
          className="rounded-lg mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{eventData.title}</h1>
        <p className="text-gray-600 mb-2">{eventData.location}</p>
        <p className="text-gray-600 mb-2">{eventData.startTime}</p>
        <p className="text-gray-600 mb-2">{eventData.endTime}</p>
        <div className="mb-4">
          {eventTags.map((tag) => (
            <span
              key={eventData.id}
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
          {eventData.tickets.map(
            (ticket: (typeof eventData.tickets)[number], index: number) => (
              <div
                key={index}
                className="flex justify-between items-center mb-4"
              >
                <span className="text-gray-800 font-bold">
                  {ticket.type}:{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(ticket.price || 0)}
                </span>
                <div className="flex items-center">
                  <button
                    onClick={() => handleTicketAmountChange(ticket.type, -1)}
                    disabled={ticketQuantities[ticket.type] <= 1}
                    className="text-gray-500 focus:outline-none focus:bg-gray-300 p-2 rounded-l-md"
                  >
                    -
                  </button>
                  <span className="flex items-center justify-center bg-white text-black mx-2 p-2">
                    {ticketQuantities[ticket.type]}
                  </span>
                  <button
                    onClick={() => handleTicketAmountChange(ticket.type, 1)}
                    className="text-gray-500 focus:outline-none focus:bg-gray-300 p-2 rounded-r-md"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-800 font-bold">
                  Total:{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(calculateTotalCost([ticket], ticketQuantities))}
                </span>
              </div>
            ),
          )}
          <button
            onClick={() => onCheckOut(eventData)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            Add to Cart (
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(getTotalCost())}
            )
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailMock;

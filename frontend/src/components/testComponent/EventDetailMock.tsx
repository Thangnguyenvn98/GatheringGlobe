import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCurrentEventDetail } from "@/services/queries";
import { TicketType } from "@/types/ticket";
import useCart from "@/hooks/use-cart-store";
import { Button } from "../ui/button";

const EventDetailMock: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  useParams<{ eventId: string }>();
  console.log(eventId);
  const {
    data: eventData,
    isLoading,
    error,
  } = useCurrentEventDetail(eventId || "");
  console.log(eventData);
  const { addToCart } = useCart();
  const [ticketQuantities, setTicketQuantities] = useState<{
    [key: string]: number;
  }>({});
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    if (eventData && eventData.tickets) {
      const initialQuantities: { [key: string]: number } = {};
      eventData.tickets.forEach((ticket: TicketType) => {
        initialQuantities[ticket._id] = 0;
      });
      setTicketQuantities(initialQuantities);
    }
  }, [eventData]);

  const handleTicketAmountChange = (ticketId: string, amount: number) => {
    setTicketQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      newQuantities[ticketId] = Math.max(
        0,
        (newQuantities[ticketId] || 0) + amount,
      );
      calculateTotalCost(newQuantities);
      return newQuantities;
    });
  };

  const calculateTotalCost = (quantities: { [key: string]: number }) => {
    let total = 0;
    if (eventData && eventData.tickets) {
      eventData.tickets.forEach((ticket: TicketType) => {
        total += (quantities[ticket._id] || 0) * ticket.price;
      });
    }
    setTotalCost(total);
  };

  const handleAddToCart = () => {
    const ticketsToAdd: {
      [key: string]: { ticketType: string; quantity: number; price: number };
    } = {};
    Object.entries(ticketQuantities).forEach(([ticketId, quantity]) => {
      if (quantity > 0) {
        const ticket = eventData?.tickets.find(
          (t: TicketType) => t._id === ticketId,
        );
        if (ticket) {
          ticketsToAdd[ticketId] = {
            ticketType: ticket.type,
            quantity,
            price: ticket.price,
          };
        }
      }
    });

    if (Object.keys(ticketsToAdd).length > 0) {
      addToCart(eventId!, eventData?.title || "", ticketsToAdd);
      const resetQuantities: { [key: string]: number } = {};
      Object.keys(ticketQuantities).forEach((ticketId) => {
        resetQuantities[ticketId] = 0;
      });
      setTicketQuantities(resetQuantities);
      setTotalCost(0);
    }
  };

  const handleCheckOut = () => {
    console.log(eventData);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading event details.</div>;
  }

  if (!eventData) {
    return <div>No event data found.</div>;
  }

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
        <p className="text-gray-600 mb-2">
          {new Date(eventData.startTime).toLocaleString()}
        </p>
        <p className="text-gray-600 mb-2">
          {new Date(eventData.endTime).toLocaleString()}
        </p>
        <div className="mb-4">
          {eventData.categories?.map((tag: string) => (
            <span
              key={tag}
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
          {eventData.tickets.map((ticket: TicketType) => (
            <div key={ticket._id} className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span>{ticket.type} - </span>
                  <span className={`${ticket.price === 0 ? "font-bold" : ""}`}>
                    {ticket.price === 0 ? "Free" : `$${ticket.price}`}
                  </span>
                </div>
                <div className="flex items-center">
                  <Button
                    variant={"outline"}
                    onClick={() => handleTicketAmountChange(ticket._id, -1)}
                    className="text-gray-500 focus:outline-none focus:bg-gray-300 p-2 rounded-l-md"
                    disabled={ticketQuantities[ticket._id] <= 0}
                    aria-label="Decrease ticket amount"
                  >
                    -
                  </Button>
                  <span className=" bg-white text-black mx-2 p-2 w-8 text-center">
                    {ticketQuantities[ticket._id]}
                  </span>
                  <Button
                    variant={"outline"}
                    onClick={() => handleTicketAmountChange(ticket._id, 1)}
                    className="text-gray-500 focus:outline-none focus:bg-gray-300 p-2 rounded-r-md"
                    aria-label="Increase ticket amount"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-800 font-bold">
              Total:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(totalCost)}
            </span>
            <div>
              <Button
                onClick={handleAddToCart}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Add to Cart
              </Button>
              <Button
                onClick={handleCheckOut}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Check Out Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailMock;

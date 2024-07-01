import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCurrentEventDetail } from "@/services/queries";
import { TicketType } from "@/types/ticket";
import useCart from "@/hooks/use-cart-store";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/services/queries";
import sanitizeHtml from "sanitize-html";
import { format } from "date-fns";
import { CalendarCheck2, FilePenLine, MapPin } from "lucide-react";
import { UserAvatar } from "../ui/user-avatar";

const EventDetail: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUser();
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
  const [showTickets, setShowTickets] = useState<boolean>(false);

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
    setTotalCost(Number(total.toFixed(2)));
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
      addToCart(
        eventId!,
        eventData?.title || "",
        eventData?.imageUrls[0] || "",
        ticketsToAdd,
      );
      const resetQuantities: { [key: string]: number } = {};
      Object.keys(ticketQuantities).forEach((ticketId) => {
        resetQuantities[ticketId] = 0;
      });
      setTicketQuantities(resetQuantities);
      setTotalCost(0);
    }
  };

  const handleCheckout = () => {
    if (!currentUser) {
      navigate("/register", { state: { from: "/checkout" } });
    } else {
      navigate(`/checkout`);
    }
    console.log("Checkout");
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString),
    );
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

  const sanitizedDescription = sanitizeHtml(eventData?.description, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "b",
      "i",
      "u",
      "s",
      "ul",
      "li",
      "ol",
    ]),
    allowedAttributes: {
      "*": ["style"],
      a: ["href", "name", "target"],
      img: ["src"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });
  const eventDate = format(eventData?.startTime, "EEEE, MMM dd");

  const minPrice = Math.min(
    ...eventData.tickets.map((ticket: TicketType) => ticket.price),
  ).toFixed(2);
  const maxPrice = Math.max(
    ...eventData.tickets.map((ticket: TicketType) => ticket.price),
  ).toFixed(2);

  const isAuthor = currentUser?._id === eventData?.organizerId._id;

  return (
    <div className="p-5">
      <div className="relative mb-4 flex justify-center mx-20">
        <div
          className="absolute mx-10 inset-0 bg-cover bg-center flex flex-col justify-center items-center filter blur-lg rounded-lg"
          style={{ backgroundImage: `url(${eventData.imageUrls[0]})` }}
        ></div>
        <div className="max-w-[900px]  flex justify-center items-center relative">
          <img
            src={eventData.imageUrls[0]}
            alt={eventData.title}
            className="object-cover h-[450px] w-[900px] mb-4 rounded-xl"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-center 2xl:gap-x-6 2xl:flex-row 2xl:justify-center py-4 mx-10 ">
        <div className="w-full md:w-3/5 mb-4 md:mb-0 pr-4 2xl:w-1/3">
          <p className="text-gray-600 text-xl">{eventDate}</p>

          <h1 className="text-6xl font-bold text-black mb-2 max-w-[700px]">
            {eventData.title}
          </h1>

          <div className="mb-4 mt-10">
            <h2 className="text-3xl font-semibold mb-2">Date and time</h2>
            <div className="text-gray-600 mb-2 flex items-center gap-x-2">
              <CalendarCheck2 />
              Starts on {formatDate(eventData.startTime)} -{" "}
              {formatDate(eventData.endTime)}
            </div>
          </div>
          <div className="mb-4 mt-14">
            <h2 className="text-3xl font-semibold mb-2">Location</h2>
            <div className="text-gray-600 mb-2 flex items-center gap-x-4">
              <MapPin fill="black" color="white" className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="font-semibold text-black">
                  {eventData?.location.city}
                </span>
                <span> {eventData?.location.fullAddress}</span>
              </div>
            </div>
          </div>
          <div className="mt-14 break-words">
            <h2 className="text-3xl font-semibold mb-2">About this event</h2>
            <div
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            ></div>
          </div>
          <div className="mt-14">
            <h2 className="text-3xl font-semibold mb-2">Organized by</h2>
            <div className="bg-slate-200 rounded-xl max-w-80 p-4 mt-10">
              <div className="flex items-center gap-x-4">
                <UserAvatar
                  username={eventData?.organizerId?.username}
                  imageUrl={
                    eventData?.organizerId?.imageUrl || eventData.imageUrls[0]
                  }
                />
                <h2 className="text-lg font-semibold">
                  {eventData?.organizerId?.username}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/5 md:sticky md:top-44 md:self-start xl:w-[80%] 2xl:max-w-[600px]">
          {!showTickets ? (
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <div className="flex justify-center items-center mb-2">
                <span className="text-xs font-bold text-gray-600 bg-orange-200 rounded-full px-2 py-1 mr-2">
                  Early bird discount
                </span>
                <span className="text-xs font-bold text-gray-600 bg-orange-200 rounded-full px-2 py-1">
                  Discount applied
                </span>
              </div>
              <p className="text-2xl font-bold mb-2">
                {minPrice === maxPrice
                  ? `$${minPrice}`
                  : `$${minPrice} - $${maxPrice}`}
              </p>
              <Button
                className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowTickets(true)}
              >
                Get tickets
              </Button>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Tickets</h3>
              {eventData.tickets.map((ticket: TicketType) => (
                <div key={ticket._id} className="mb-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-2">{ticket.type}</span>
                      <span
                        className={`${ticket.price === 0 ? "font-bold" : ""}`}
                      >
                        {ticket.price === 0
                          ? "Free"
                          : `$${Number(ticket.price).toFixed(2)}`}
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
                      <span className="bg-white text-black mx-2 p-2 w-8 text-center">
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
                    className="bg-orange-500 text-white px-3 py-1 rounded-lg mr-1"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onClick={() => handleCheckout()}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg"
                  >
                    Check Out Now
                  </Button>
                </div>
              </div>
            </div>
          )}
          {isAuthor && (
            <div className="relative z-50 top-10 max-w-[150px]">
              <Link
                className="flex items-center gap-x-2 p-4 hover:bg-slate-300 rounded-lg bg-white"
                to={`/my-event/${eventId}/edit/`}
              >
                <FilePenLine className="w-8 h-8" />
                <h2>Edit Event</h2>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;

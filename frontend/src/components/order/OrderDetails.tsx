import { useCurrentOrderDetail } from "@/services/queries";
import { useParams } from "react-router-dom";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
} from "react-icons/fa";
import { format } from "date-fns";
import { Loader2, ServerCrash } from "lucide-react";
const cardBrandIcons = {
  visa: <FaCcVisa size={40} />,
  mastercard: <FaCcMastercard size={40} />,
  amex: <FaCcAmex size={40} />,
  discover: <FaCcDiscover size={40} />,
  // Add more brands as needed
};
const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useCurrentOrderDetail(id || "");
  if (isLoading) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading Your Orders
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }
  const { order, paymentMethod, created, billing_details, discountedTickets } =
    data;

  const purchaseDate = format(new Date(created * 1000), "MMMM dd, yyyy");
  const totalDiscount = discountedTickets.reduce((acc, curr) => {
    return acc + curr.discountPerTicket * curr.quantity;
  }, 0);
  return (
    <div className="flex flex-col items-center bg-white">
      <div className="max-w-[1000px] p-4 w-full">
        <h2 className="font-bold text-4xl">Order Details</h2>
        <div className="grid grid-cols-[70%_30%] min-h-[100px] mt-2">
          <div className="flex gap-x-6">
            <h2>Ordered on {purchaseDate}</h2>
            <h2>|</h2>
            <h2>Order# {order._id}</h2>
          </div>
          <div className="text-end">
            <h2>GatheringGlobe Inc.</h2>
          </div>
        </div>
        <div className="grid grid-cols-[20%_50%_30%] p-4 border-2 rounded-lg">
          <div>
            <h2 className="font-bold text-lg">Billing Address</h2>
            <p>
              {order.firstName} {order.lastName}{" "}
            </p>
            <p>{billing_details.address.line1}</p>
            <p>{billing_details.address.line2}</p>
            <p>
              {billing_details.address.city && " ,"}
              {billing_details.address.state}{" "}
              {billing_details.address.postal_code}
            </p>
            <p>{billing_details.address.country}</p>
          </div>
          <div>
            <h2>Payment Methods</h2>
            <div className="flex items-center gap-x-4">
              {cardBrandIcons[
                paymentMethod.brand?.toLowerCase() as keyof typeof cardBrandIcons
              ] || <span>{paymentMethod.brand}</span>}
              <span>
                {paymentMethod.brand?.toUpperCase()} **** {paymentMethod.last4}
              </span>
              <span>
                Exp: {paymentMethod.exp_month}/{paymentMethod.exp_year}
              </span>
            </div>
            <div className="flex items-center gap-x-2">
              <span>Status:</span>
              <span className="text-green-500 font-semibold">
                {order.paymentStatus.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Order Summary</h2>
            <div className="flex justify-between">
              <div>
                <p>Ticket Subtotal:</p>
                <p>Your Discount Savings:</p>
                <p className="font-bold">Grand Total:</p>
              </div>
              <div>
                <p>${order.totalPrice.toFixed(2)}</p>
                <p
                  className={`${totalDiscount ? "text-red-500" : "text-black"}`}
                >
                  {totalDiscount ? "-" : ""}$
                  {totalDiscount ? totalDiscount.toFixed(2) : 0}
                </p>
                <p>${order.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {order.events.map((event) => (
          <div
            key={event.eventId._id.toString()}
            className="p-4 border rounded-lg mt-4"
          >
            <div className="flex flex-col gap-y-4">
              <h2 className="font-bold">Order Details Sent To Your Email</h2>
              <h2>Email: {order.email}</h2>
              <div className="grid grid-cols-[20%_80%] gap-x-4">
                <div className="w-48 h-48 relative">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={event.eventId.imageUrls[0]}
                    alt={event.eventId.title}
                  />
                </div>
                <div className="flex flex-col ml-20 items-start">
                  <h2 className="font-bold text-lg">{event.eventId.title}</h2>
                  <p>
                    {format(new Date(event.eventId.startTime), "MMMM dd, yyyy")}
                  </p>
                  <p>
                    {format(new Date(event.eventId.startTime), "hh:mm a")} -{" "}
                    {format(new Date(event.eventId.endTime), "hh:mm a")}
                  </p>
                  <span>Sold by: {event.eventId.organizerId.username}</span>
                  <span>Contact: {event.eventId.organizerId.email}</span>
                </div>
              </div>
              <div>
                {event.tickets.map((ticket) => {
                  const discountedTicket = discountedTickets.find(
                    (dt) =>
                      dt.eventId === event.eventId._id &&
                      dt.ticketId === ticket.ticketId._id,
                  );
                  const totalPrice = ticket.ticketId.price * ticket.quantity;
                  const totalDiscount =
                    (discountedTicket?.discountPerTicket || 0) *
                      (discountedTicket?.quantity || 1) || 0;
                  const finalPrice = totalPrice - totalDiscount || 0;
                  return (
                    <div key={ticket.ticketId._id} className="mt-2 ">
                      <p className="text-xl font-bold">
                        {ticket.ticketId.type}
                      </p>
                      <div className="flex justify-between">
                        <div className="flex flex-col">
                          {discountedTicket ? (
                            <>
                              <span>Original Price:</span>
                              <span className="font-semibold">Discount:</span>
                              <span>Total Discount:</span>
                              <span>Final Price:</span>
                            </>
                          ) : (
                            <>
                              <span>Price:</span>
                            </>
                          )}
                        </div>

                        <div className="flex flex-col">
                          {discountedTicket ? (
                            <>
                              <span className="text-red-400 text-end">
                                ${ticket.ticketId.price} x {ticket.quantity} ($
                                {totalPrice})
                              </span>
                              <span className="text-end">
                                (Code: {discountedTicket.discountCode})
                              </span>
                              <span className="text-red-400 text-end">
                                ${discountedTicket.discountPerTicket.toFixed(2)}{" "}
                                x {discountedTicket.quantity} (-$
                                {totalDiscount.toFixed(2)})
                              </span>
                              <span className="font-bold ml-2 text-end">
                                ${finalPrice.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="font-semibold">
                                ${ticket.ticketId.price} x {ticket.quantity} ($
                                {totalPrice})
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;

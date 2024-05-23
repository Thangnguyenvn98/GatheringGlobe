import { useCurrentOrderDetail } from "@/services/queries";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
} from "react-icons/fa";
import { format } from "date-fns";
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
  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>No data found for this Order</div>;
  const { order, paymentMethod, created, billing_details } = data;
  const purchaseDate = format(new Date(created * 1000), "MMMM dd, yyyy");
  console.log(order);

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-[1000px] p-4 w-full">
        <h2 className="font-bold text-4xl">Order Details</h2>
        <div className="grid grid-cols-[70%_30%] min-h-[100px] mt-2">
          <div className="flex gap-x-6">
            <h2>Ordered on {purchaseDate}</h2>
            <h2>|</h2>
            <h2>Order# {order._id}</h2>
          </div>
          <div className="text-end">
            <h2>GatheringGlobe Inc</h2>
          </div>
        </div>
        <div className="grid grid-cols-[20%_50%_30%] p-4 border rounded-lg">
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
                <p>Total before discount:</p>
                <p className="font-bold">Grand Total:</p>
              </div>
              <div>
                <p>${order.totalPrice.toFixed(2)}</p>
                <p>$0</p>
                <p>$0</p>
                <p>${order.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {order.events.map((event) => (
          <div
            key={event.eventId._id.toString()}
            className="p-4 border rounded-lg grid grid-cols-[65%_35%] mt-4"
          >
            <div className="flex flex-col gap-y-4">
              <h2 className="font-bold">Order Details Sent To Your Email</h2>
              <h2>Email: {order.email}</h2>
              <div className="grid grid-cols-[20%_80%] gap-x-4">
                <div>
                  <img
                    src={event.eventId.imageUrls[0]}
                    alt={event.eventId.title}
                  />
                </div>
                <div>
                  <h2>{event.eventId.title}</h2>
                  <p>
                    {format(new Date(event.eventId.startTime), "MMMM dd, yyyy")}
                  </p>
                  <p>
                    {format(new Date(event.eventId.startTime), "hh:mm a")} -{" "}
                    {format(new Date(event.eventId.endTime), "hh:mm a")}
                  </p>
                </div>
              </div>
              <div>
                {event.tickets.map((ticket) => (
                  <div key={ticket.ticketId._id.toString()} className="mt-2">
                    <p>{ticket.ticketId.type} Ticket</p>
                    <p>Quantity Purchased: {ticket.quantity}</p>
                    <p>Price: ${ticket.ticketId.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-y-4 mt-2 ">
              <Button className="w-60 self-center">
                Leave Seller Feedback
              </Button>
              <Button className="w-60 self-center">
                Ask a Event-Related Question
              </Button>
              <Button className="w-60 self-center">Write a Event Review</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;

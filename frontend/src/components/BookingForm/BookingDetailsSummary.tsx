import { CartItem } from "@/hooks/use-cart-store";

const BookingDetailsSummary = ({
  cartItems,
  totalCost,
}: {
  cartItems: CartItem[];
  totalCost: number;
}) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">Booking Details Summary</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} className="mb-2">
            <div className="font-medium">{item.eventName}</div>
            {Object.entries(item.tickets).map(([ticketId, ticketDetails]) => (
              <div key={ticketId} className="ml-4">
                <div>Type: {ticketDetails.ticketType}</div>
                <div>Quantity: {ticketDetails.quantity}</div>
                <div>Price: ${ticketDetails.price}</div>
              </div>
            ))}
          </li>
        ))}
      </ul>
      <div className="mt-4 font-semibold text-lg">
        Total Cost: ${totalCost.toFixed(2)}
      </div>
    </div>
  );
};

export default BookingDetailsSummary;

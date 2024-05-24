import { CartItem } from "@/hooks/use-cart-store";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const BookingDetailsSummary = ({
  cartItems,
  totalCost,
  updateCart,
}: {
  cartItems: CartItem[];
  totalCost: number;
  updateCart: (eventId: string, ticketId: string, increment: number) => void;
}) => {
  return (
    <div className=" rounded-lg p-4 shadow-sm ">
      <h3 className="text-lg font-semibold mb-4">Pay Gathering Globe</h3>
      <h1 className="font-bold text-4xl">${totalCost.toFixed(2)}</h1>
      <div className="flex flex-col gap-y-4">
        {cartItems.map((item, index) => (
          <div key={index} className="flex flex-col gap-y-4 mt-4">
            <div className="flex items-center">
              <div className="font-medium text-lg ">{item.eventName}</div>
            </div>
            {Object.entries(item.tickets).map(([ticketId, ticketDetails]) => (
              <div key={ticketId} className="flex flex-col">
                <div className="flex justify-between">
                  <div>{ticketDetails.ticketType} Ticket</div>
                  <div className="font-semibold"> ${ticketDetails.price}</div>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="text-gray-400">Qty</span>
                  <Button
                    onClick={() => updateCart(item.eventId, ticketId, -1)}
                    variant={"outline"}
                    className="text-gray-500 focus:outline-none focus:bg-gray-300 p-2 rounded-l-md"
                    aria-label="Decrease ticket amount"
                  >
                    -
                  </Button>

                  <span className="w-6 text-center">
                    {ticketDetails.quantity}
                  </span>
                  <Button
                    onClick={() => updateCart(item.eventId, ticketId, 1)}
                    variant={"outline"}
                    className="text-gray-500 focus:outline-none focus:bg-gray-300 p-2 rounded-l-md"
                    aria-label="Increase ticket amount"
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ))}
        <Separator className="h-[2px]" />
        <div className="mt-4 font-semibold text-lg flex justify-between">
          <span>Total due</span>
          <span> ${totalCost.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;

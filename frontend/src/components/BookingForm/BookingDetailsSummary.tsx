import { CartItem } from "@/hooks/use-cart-store";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
    <div className=" rounded-lg p-4 shadow-lg bg-gray-100 ">
      <h3 className="text-lg font-semibold mb-4">Pay Gathering Globe</h3>
      <h1 className="font-bold text-4xl">${totalCost.toFixed(2)}</h1>
      <Separator className="h-[2px] mt-2 bg-slate-500" />
      <div className="flex flex-col gap-y-4">
        {cartItems.map((item, index) => (
          <div key={item.eventId} className="grid grid-cols-[1fr_2fr] ">
            <div className="relative w-40 h-40 top-5 ">
              <img
                alt={item.eventName}
                src={item.eventImageUrl || ""}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
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
          </div>
        ))}
        <Separator className="h-[2px] bg-slate-500" />
        {/* Discount code section */}
        <div className="mt-2">
          <div className="flex justify-between items-center gap-x-4 h-full min-h-10">
            <Input
              placeholder="Gift card or discount code"
              className="bg-white min-h-14"
            />
            <Button className="min-h-14">Apply</Button>
          </div>
        </div>
        <Separator className="h-[2px] bg-slate-500" />
        {/* Total due */}
        <div className="mt-4 font-semibold text-lg flex justify-between">
          <span>Total due</span>
          <span> ${totalCost.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;

import { CartItem } from "@/hooks/use-cart-store";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { applyDiscountCode, removeDiscountCode } from "@/services/api";
import { DiscountedTicket } from "@/types/applyDiscount";
import { Tag, X } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookingDetailsSummary = ({
  paymentIntentId,
  cartItems,
  totalCost,
  updateCart,
}: {
  cartItems: CartItem[];
  paymentIntentId: string;
  totalCost: number;
  updateCart: (eventId: string, ticketId: string, increment: number) => void;
}) => {
  const [currentTotalCost, setCurrentTotalCost] = useState(totalCost);
  const [totalDiscount, setTotalDiscount] = useState(0);
  console.log(paymentIntentId);
  const [discountCodes, setDiscountCodes] = useState<string[]>([]);
  const [discountCodeInput, setDiscountCodeInput] = useState("");
  const [discountDetails, setDiscountDetails] = useState<DiscountedTicket[]>(
    [],
  );
  const navigate = useNavigate();

  const applyDiscount = async () => {
    try {
      const { message, newTotal, discountedTickets, discountAmount } =
        await applyDiscountCode(
          cartItems,
          currentTotalCost,
          discountCodeInput,
          paymentIntentId,
          discountCodes,
        );
      console.log("discountedTickets", discountedTickets);
      toast.success(message);
      const updatedTotalDiscount = totalDiscount + discountAmount;

      setCurrentTotalCost(newTotal);
      setDiscountDetails([...discountDetails, ...discountedTickets]);
      setDiscountCodes([...discountCodes, discountCodeInput]);
      setTotalDiscount(updatedTotalDiscount);
      setDiscountCodeInput("");
    } catch (error) {
      console.error("Error applying discount:", error);
    }
  };

  const removeDiscount = async (code: string) => {
    try {
      const { message, newTotal, discountedTickets, discountAmount } =
        await removeDiscountCode(
          cartItems,
          currentTotalCost,
          code,
          paymentIntentId,
          totalDiscount,
        );
      toast.success(message);
      setCurrentTotalCost(newTotal);
      console.log("discountedTickets", discountedTickets);
      setDiscountDetails(discountedTickets);
      setTotalDiscount(discountAmount);
      setDiscountCodes(discountCodes.filter((c) => c !== code));
    } catch (error) {
      console.error("Error removing discount:", error);
    }
  };

  const onUpdateCart = (
    eventId: string,
    ticketId: string,
    increment: number,
  ) => {
    updateCart(eventId, ticketId, increment);
    navigate(0);
  };

  return (
    <div className=" rounded-lg p-4 shadow-lg bg-gray-100 ">
      <h3 className="text-lg font-semibold mb-4">Pay Gathering Globe</h3>
      <h1 className="font-bold text-4xl">${currentTotalCost.toFixed(2)}</h1>
      <Separator className="h-[2px] mt-4 bg-slate-500" />
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
            <div key={index} className="flex flex-col gap-y-4 my-4">
              <div className="flex items-center">
                <div className="font-medium text-lg ">{item.eventName}</div>
              </div>
              {Object.entries(item.tickets).map(([ticketId, ticketDetails]) => {
                const discountInfo = discountDetails.find(
                  (dt) =>
                    dt.ticketId === ticketId && dt.eventId === item.eventId,
                );
                console.log("discountInfo", discountInfo);

                return (
                  <div key={ticketId} className="flex flex-col">
                    <div className="flex justify-between">
                      <div>{ticketDetails.ticketType}</div>
                      <div className="font-semibold">
                        {discountInfo ? (
                          <div className="flex flex-col">
                            <span className="line-through text-xs text-muted-foreground self-end">
                              $
                              {(
                                ticketDetails.price * ticketDetails.quantity
                              ).toFixed(2)}
                            </span>{" "}
                            <span>
                              $
                              {(
                                discountInfo.newPrice * discountInfo.quantity
                              ).toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          `$${ticketDetails.price.toFixed(2)}`
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <span className="text-gray-400">Qty</span>
                      <Button
                        onClick={() => onUpdateCart(item.eventId, ticketId, -1)}
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
                        onClick={() => onUpdateCart(item.eventId, ticketId, +1)}
                        variant={"outline"}
                        className="text-gray-500 focus:outline-none focus:bg-gray-300 p-2 rounded-l-md"
                        aria-label="Increase ticket amount"
                      >
                        +
                      </Button>
                    </div>

                    {discountInfo && (
                      <div className="text-sm text-gray-500 flex items-center gap-x-2 mt-4 ">
                        <Tag />
                        <span>
                          {discountInfo.discountCode} (-$
                          {(
                            discountInfo.discountPerTicket *
                            discountInfo.quantity
                          ).toFixed(2)}{" "}
                          )
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <Separator className="h-[2px] bg-slate-500 mt-4" />
        {/* Discount code section */}
        <div className="flex flex-col gap-y-4 mt-2">
          <div className="flex justify-between items-center gap-x-4 h-full min-h-10">
            <Input
              placeholder="Gift card or discount code"
              className="bg-white min-h-14"
              value={discountCodeInput}
              onChange={(e) => setDiscountCodeInput(e.target.value)}
            />
            <Button onClick={applyDiscount} className="min-h-14">
              Apply
            </Button>
          </div>
          <div className="flex gap-x-4">
            {discountCodes.map((code, index) => (
              <div
                key={index}
                className="flex gap-x-2 items-center p-2 bg-gray-300 rounded-lg"
              >
                <Tag />
                <span>{code}</span>
                <Button
                  variant="ghost"
                  className="px-0"
                  onClick={() => removeDiscount(code)}
                >
                  <X />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <Separator className="h-[2px] bg-slate-500" />
        {/* Total due */}
        <div className="flex flex-col">
          <div className="mt-4 font-semibold text-md flex justify-between">
            <span>Subtotal</span>
            <span> ${totalCost.toFixed(2)}</span>
          </div>
          {totalDiscount > 0 && (
            <div className="mt-4 font-semibold text-md flex justify-between text-red-500 ">
              <span>Discount</span>
              <span> -${totalDiscount.toFixed(2)}</span>
            </div>
          )}

          <div className="mt-4 font-bold text-lg flex justify-between">
            <span>Total due</span>
            <span> ${currentTotalCost.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;

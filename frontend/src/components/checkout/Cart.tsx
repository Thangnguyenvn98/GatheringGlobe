import React from "react";
import useCart from "@/hooks/use-cart-store";
import { Button } from "../ui/button";
import { LockKeyhole, Trash } from "lucide-react";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/services/queries";

const Cart: React.FC = () => {
  const { cartItems, updateCart, removeFromCart, clearCart, getTotalCost } =
    useCart();
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUser();

  const handleQuantityChange = (
    eventId: string,
    ticketId: string,
    increment: number,
  ) => {
    updateCart(eventId, ticketId, increment);
  };

  const handleRemove = (eventId: string, ticketId: string) => {
    removeFromCart(eventId, ticketId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    if (!currentUser) {
      navigate("/register", { state: { from: "/checkout" } });
    } else {
      navigate(`/checkout`);
    }
    console.log("Checkout");
  };

  if (cartItems.length === 0) {
    return <div className="p-4">Your cart is empty.</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-2">Your Cart Summary</h2>

        <button
          onClick={handleClearCart}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Clear All
        </button>
      </div>
      {cartItems.map((cartItem) => (
        <div key={cartItem.eventId} className="mb-6">
          <div className="flex items-center gap-x-2">
            <div className="relative h-20 w-20">
              <img
                src={cartItem.eventImageUrl}
                alt={cartItem.eventName}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <h3 className="text-lg font-bold my-4">{cartItem.eventName}</h3>
          </div>

          {cartItem.tickets &&
            Object.entries(cartItem.tickets).map(([ticketId, ticket]) => (
              <div
                key={`${cartItem.eventId}-${ticketId}`}
                className="flex items-center gap-x-2 justify-between mb-2"
              >
                <span className="font-medium">
                  {ticket.ticketType} - ${ticket.price.toFixed(2)}
                </span>

                <div className="flex items-center gap-x-2">
                  <Button
                    onClick={() =>
                      handleQuantityChange(cartItem.eventId, ticketId, -1)
                    }
                    className=" p-2 rounded-r-md text-gray-500"
                    aria-label="Decrease ticket quantity"
                    variant={"ghost"}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{ticket.quantity}</span>
                  <Button
                    onClick={() =>
                      handleQuantityChange(cartItem.eventId, ticketId, 1)
                    }
                    className=" p-2 rounded-r-md text-gray-500"
                    aria-label="Increase ticket quantity"
                    variant={"ghost"}
                  >
                    +
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={() => handleRemove(cartItem.eventId, ticketId)}
                  >
                    <Trash className="w-5 h-5 " color="red" />
                  </Button>
                </div>
              </div>
            ))}
          <Separator className="h-[3px]" />
        </div>
      ))}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xl font-bold">
          Total:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(getTotalCost())}
        </span>
        <Button
          onClick={handleCheckout}
          className="bg-green-500 text-white px-4 py-2 rounded-lg gap-x-2"
        >
          <LockKeyhole />
          <span>Checkout</span>
        </Button>
      </div>
    </div>
  );
};

export default Cart;

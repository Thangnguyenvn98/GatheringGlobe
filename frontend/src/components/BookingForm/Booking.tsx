import { useStripeContext } from "../providers/stripe-provider";
import useCartStore from "@/hooks/use-cart-store";
import { useCurrentUser, usePaymentIntent } from "@/services/queries";
import { Elements } from "@stripe/react-stripe-js";
import BookingForm from "./BookingForm";
import BookingDetailsSummary from "./BookingDetailsSummary";
import { Frown } from "lucide-react";
import { useEffect } from "react";

const Booking = () => {
  const { stripePromise } = useStripeContext();
  const {
    cartItems,
    getTotalCost,
    updateCart,
    setPaymentIntentId,
    clearPaymentIntentId,
  } = useCartStore();
  const { data: paymentIntentData } = usePaymentIntent(cartItems);
  const { data: currentUser } = useCurrentUser();
  useEffect(() => {
    if (paymentIntentData) {
      setPaymentIntentId(paymentIntentData.paymentIntentId);
    } else {
      clearPaymentIntentId();
    }
  }, [paymentIntentData, setPaymentIntentId, clearPaymentIntentId]);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center  py-10 mt-[350px] ">
        <div className="flex items-center gap-x-4">
          <p className="font-bold text-4xl">
            Sorry your cart is empty please head to our event pages and add
            ticket to your cart
          </p>
          <Frown size={60} color="red" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-10 ">
      <div className="flex flex-col gap-y-4">
        <h1 className="font-bold text-4xl">Checkout</h1>
        <div className="grid grid-cols-[1fr_1fr] p-4 gap-8 border border-gray-300 rounded-lg shadow-md min-w-[1500px] min-h-[800px]">
          <BookingDetailsSummary
            cartItems={cartItems}
            totalCost={getTotalCost()}
            updateCart={updateCart}
          />
          {currentUser && paymentIntentData && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret: paymentIntentData.clientSecret,
                appearance: {
                  theme: "night",
                  variables: {
                    spacingUnit: "8px",
                    gridColumnSpacing: "8px",
                  },
                },
              }}
            >
              <BookingForm
                paymentIntent={paymentIntentData}
                currentUser={currentUser}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;

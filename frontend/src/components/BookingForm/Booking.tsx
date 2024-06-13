import { useStripeContext } from "../providers/stripe-provider";
import useCartStore from "@/hooks/use-cart-store";
import { useCurrentUser, usePaymentIntent } from "@/services/queries";
import { Elements } from "@stripe/react-stripe-js";
import BookingForm from "./BookingForm";
import BookingDetailsSummary from "./BookingDetailsSummary";
import { Frown, Loader2, ServerCrash } from "lucide-react";

const Booking = () => {
  const { stripePromise } = useStripeContext();
  const { cartItems, getTotalCost, updateCart } = useCartStore();
  const { data: currentUser } = useCurrentUser();
  const {
    data: paymentIntentData,
    isError,
    isLoading,
  } = usePaymentIntent(cartItems);

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
  if (isLoading) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading payment summary
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-10 bg-white ">
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
              key={paymentIntentData.clientSecret}
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

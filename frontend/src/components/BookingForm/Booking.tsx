import { useStripeContext } from "../providers/stripe-provider";
import useCartStore from "@/hooks/use-cart-store";
import { useCurrentUser, usePaymentIntent } from "@/services/queries";
import { Elements } from "@stripe/react-stripe-js";
import BookingForm from "./BookingForm";
import BookingDetailsSummary from "./BookingDetailsSummary";

const Booking = () => {
  const { stripePromise } = useStripeContext();
  const { cartItems, getTotalCost } = useCartStore();
  const { data: paymentIntentData } = usePaymentIntent(cartItems);
  const { data: currentUser } = useCurrentUser();
  return (
    <div className="flex justify-center py-10">
      <div className="flex flex-col gap-y-4">
        <h1 className="font-bold text-4xl">Checkout</h1>
        <div className="grid grid-cols-[1fr_1fr] p-4 gap-8 border border-gray-300 rounded-lg shadow-md">
          <BookingDetailsSummary
            cartItems={cartItems}
            totalCost={getTotalCost()}
          />
          {currentUser && paymentIntentData && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret: paymentIntentData.clientSecret,
                appearance: { theme: "night" },
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

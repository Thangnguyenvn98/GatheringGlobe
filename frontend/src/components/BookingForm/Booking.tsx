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
      <div className="grid grid-cols-[1fr_2fr] p-4 gap-8 border border-gray-300 rounded-lg shadow-md">
        <BookingDetailsSummary
          cartItems={cartItems}
          totalCost={getTotalCost()}
        />
        {currentUser && paymentIntentData && (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: paymentIntentData.clientSecret }}
          >
            <BookingForm
              paymentIntent={paymentIntentData}
              currentUser={currentUser}
            />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Booking;

import { useParams } from "react-router-dom";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { useStripeContext } from "../providers/stripe-provider";
import { useCurrentUser, usePaymentIntent } from "@/services/queries";
import BookingForm from "./BookingForm";

const Booking = () => {
  const { stripePromise } = useStripeContext();
  const { hotelId } = useParams();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [numberOfNights, setNumberOfNights] = useState<number>(2);

  const { data: paymentIntentData } = usePaymentIntent(
    hotelId as string,
    numberOfNights,
  );

  const { data: currentUser } = useCurrentUser();

  return (
    <div className="grid md:grid-cols-[1fr_2fr] bg-red-500 p-4">
      <div className="font-bold text-4xl">Hello Testing</div>
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;

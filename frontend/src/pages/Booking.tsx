import { useQuery } from "@tanstack/react-query";
import * as api from "../services/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { Elements } from "@stripe/react-stripe-js";
import BookingForm from "../components/BookingForm/BookingForm";
import { useCurrentUser } from "@/services/queries";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const { stripePromise } = useAppContext();
  const { ticketId } = useParams(); // giồng này lấy ra từ url nên cần
  const [numberOfTickets, setNumberOfTickets] = useState<number>(1); // Define numberOfTickets state
  console.log(setNumberOfTickets(5));
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const userId = currentUser.data?._id;

  const { data: paymentIntentData } = useQuery({
    queryKey: ["createPaymentIntent", ticketId, numberOfTickets],
    queryFn: () =>
      api.createPaymentIntent(ticketId as string, numberOfTickets.toString()),
    enabled: !!ticketId && numberOfTickets > 0,
  });
  useEffect(() => {
    if (currentUser.status !== "pending" && !userId) {
      console.log("how about this one");
      navigate("/register");
      return;
    }
  }, [userId, currentUser.status]);

  return (
    <div className="grid md:grid-cols-[1fr_2fr] bg-red-500">
      {currentUser.data && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser.data}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;

import { PaymentIntentResponse } from "../../../../backend/src/shared/types";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { User } from "@/types/user";

type Props = {
  currentUser: User;
  paymentIntent: PaymentIntentResponse;
};

export type TicketBookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  ticketId: string; // Assuming ticketId is used for identifying tickets
  quantity: number; // Number of tickets to purchase
  paymentIntentId: string;
  totalPrice: number; // Total cost of the tickets
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const { register, handleSubmit } = useForm<TicketBookingFormData>();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const handleBooking: SubmitHandler<TicketBookingFormData> = async (
    formData
  ) => {
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      alert("Stripe Card Element not found.");
      setIsLoading(false);
      return;
    }

    try {
      const paymentResult = await stripe.confirmCardPayment(
        paymentIntent.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email, // Assuming email is correctly set from context or props
            },
          },
        }
      );
      if (paymentResult.error) {
        alert(`Payment failed: ${paymentResult.error.message}`);
      } else if (
        paymentResult.paymentIntent &&
        paymentResult.paymentIntent.status === "succeeded"
      ) {
        alert("Payment successful!");
        // Here, you might want to send confirmation to your backend or update your UI accordingly
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleBooking)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            {...register("firstName", { required: true })}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            {...register("lastName", { required: true })}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>

        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: £{paymentIntent.totalPrice.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold"> Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500"
        >
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};
export default BookingForm;

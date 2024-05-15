import { PaymentIntentResponse } from "../../../../backend/src/shared/types";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { User } from "@/types/user";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

// import { StripeCardElement } from "@stripe/stripe-js";

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

const formSchema = z.object({
  firstName: z.string().min(4),
  lastName: z.string().min(4),
  email: z.string().email(),
  ticketId: z.string(),
  quantity: z.number().int().positive(),
  paymentIntentId: z.string(),
  totalPrice: z.number().int().positive(),
});
type FormData = z.infer<typeof formSchema>;

const BookingForm = ({ paymentIntent }: Props) => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      ticketId: "",
      quantity: 0,
      paymentIntentId: paymentIntent.id,
      totalPrice: 0,
    },
  });

  const onSubmit: SubmitHandler<TicketBookingFormData> = async (data) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
    >
      <PaymentElement />
    </form>
  );
};
export default BookingForm;

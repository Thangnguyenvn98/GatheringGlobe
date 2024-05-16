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
import { Button } from "../ui/button";

// import { StripeCardElement } from "@stripe/stripe-js";

type Props = {
  currentUser: User;
  paymentIntent: PaymentIntentResponse;
};

export type TicketBookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  ticketId: string;
  quantity: number;
  paymentIntentId: string;
  totalPrice: number;
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

const BookingForm = ({ paymentIntent, currentUser }: Props) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      email: currentUser.email,
      paymentIntentId: paymentIntent.paymentIntentId,
      totalPrice: paymentIntent.totalPrice,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: "if_required",
    });
    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }
    console.log(data);
  };
  return (
    <div className="rounded-lg border border-slate-300 bg-zinc-800 p-5 flex flex-col gap-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
          <div className="flex items-center gap-x-4">
            <FormField
              control={form.control}
              name="firstName"
              rules={{ required: "First Name is required" }}
              render={({ field }) => (
                <FormItem className="text-white">
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="text-white"
                      placeholder="* First Name"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              rules={{ required: "Last Name is required" }}
              render={({ field }) => (
                <FormItem className="text-white">
                  <FormLabel htmlFor="firstName">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="text-white"
                      placeholder="* Last Name"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="lastName"
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <FormItem className="text-white">
                <FormLabel htmlFor="firstName">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="text-white"
                    placeholder="* Email"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <PaymentElement />
      <Button
        disabled={loading}
        size="lg"
        className="bg-green-400"
        type="submit"
      >
        {loading ? "Processing..." : "Pay"}
      </Button>
    </div>
  );
};
export default BookingForm;

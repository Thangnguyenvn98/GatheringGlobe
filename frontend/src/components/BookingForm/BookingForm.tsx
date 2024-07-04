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
import useCartStore from "@/hooks/use-cart-store";
import { createOrderPayment } from "@/services/api";
import toast from "react-hot-toast";
import { useModal } from "@/hooks/use-modal-store";
import { PaymentIntentResponse } from "@/types/paymentIntentResponse";

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
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  paymentIntentId: z.string(),
  totalPrice: z.number().int().positive(),
});
type FormData = z.infer<typeof formSchema>;

const BookingForm = ({ paymentIntent, currentUser }: Props) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCartStore();
  const { onOpen } = useModal();
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
    console.log("Form submitted"); // Debugging line
    if (!stripe || !elements) {
      console.log("Stripe or elements not loaded"); // Debugging line
      return;
    }
    setLoading(true);

    const { error, paymentIntent: confirmedPaymentIntent } =
      await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: "if_required",
      });
    if (error) {
      toast.error("Error confirming payment");
      setLoading(false);
      return;
    } else if (
      confirmedPaymentIntent &&
      confirmedPaymentIntent.status === "succeeded"
    ) {
      clearCart();
      localStorage.removeItem("paymentIntentId");
      form.reset();
      try {
        const response = await createOrderPayment({
          paymentIntentId: confirmedPaymentIntent.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
        if (response) {
          setLoading(false);
          onOpen("orderConfirmation", { orderId: response });
        }
      } catch (error) {
        toast.error("Failed to create order payment");
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="rounded-lg border border-slate-300 bg-zinc-800 p-5 flex flex-col gap-y-4 h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4 h-full"
        >
          <div className="flex items-center gap-x-6">
            <FormField
              control={form.control}
              name="firstName"
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
              render={({ field }) => (
                <FormItem className="text-white">
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
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
            name="email"
            render={({ field }) => (
              <FormItem className="text-white mb-4">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="text-white max-w-sm"
                    placeholder="* Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex-grow">
            <PaymentElement />
          </div>
          <Button
            size={"lg"}
            disabled={loading}
            className="bg-green-400 mt-auto"
            type="submit"
          >
            {loading ? "Processing..." : "Pay"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default BookingForm;

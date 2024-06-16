import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
// Define the schema using zod
const formSchema = z.object({
  price: z.number().min(0, { message: "Price must be at least zero" }),
  quantityAvailable: z
    .number()
    .min(1, { message: "At least one ticket must be available" }),
  type: z
    .string()
    .min(50, { message: "Ticket type must be at least 50 characters long" })
    .max(200, {
      message: "Ticket type  must be no more than 200 characters long",
    }),
});

type FormData = z.infer<typeof formSchema>;

const TicketForm = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: 0, // Default price set to 0, assuming it's in a currency
      quantityAvailable: 1, // Start with a minimum of 1 ticket available
      type: "General Admission", // Default to "General Admission"
    },
  });
  // const { fields, append, remove } = useFieldArray({
  //   control: form.control,
  //   name: "tickets",
  // });  //this help manage dynamic form field, allowing user to add or remove input form field dynamically
  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      console.log(data);
      const response = await axiosInstance.post(
        `/api/events/${eventId}/tickets`,
        [data],
      );
      form.reset();
      toast.success(response.data.message);
      setTimeout(() => {
        navigate(0);
      }, 800);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }

    console.log(data);
    toast.success("Ticket created successfully!");
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="max-w-4xl mx-auto p-5">
            <CardHeader className="text-center">
              <CardTitle>Create Ticket</CardTitle>
              <CardDescription>
                Fill out the form below to create a new ticket.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket Type*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        type="number"
                        placeholder="0.00"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        } // Convert string to number here
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantityAvailable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket Quantity Available</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        type="number"
                        placeholder="1"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        } // Convert string to number here
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="bg-white text-white px-4 py-2 rounded hover:bg-black w-full hover:text-white"
              >
                Create Ticket
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default TicketForm;

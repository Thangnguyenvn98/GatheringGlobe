import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
// Define the schema using zod
const formSchema = z
  .object({
    ticketName: z.string().min(1, { message: "Ticket name is required" }),
    ticketPrice: z.number().min(0, { message: "Price must be at least zero" }),
    quantityAvailable: z
      .number()
      .min(1, { message: "At least one ticket must be available" }),
    ticketType: z.enum(["General Admission", "VIP", "Early Bird"]),
    salesStart: z.date().refine((date) => date >= new Date(), {
      message: "Start time must be in the future",
    }),
    salesEnd: z.date().refine((date) => date >= new Date(), {
      message: "End time must be in the future",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.salesEnd <= data.salesStart) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End time must be after start time",
        path: ["endTime"],
      });
    }
  });

type FormData = z.infer<typeof formSchema>;

const TicketForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticketName: "", // Default text for ticket name
      ticketPrice: 0, // Default price set to 0, assuming it's in a currency
      quantityAvailable: 1, // Start with a minimum of 1 ticket available
      ticketType: "General Admission", // Default to "General Admission"
      salesStart: new Date(), // Initialize with the current date/time
      salesEnd: new Date(), // Initialize with the current date/time; adjust in UI if needed
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      console.log(data);

      const response = await axiosInstance.post("/api/events", data);
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
                name="ticketName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        placeholder="Enter ticket name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ticketPrice"
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
              <FormField
                control={form.control}
                name="ticketType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket Type</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ticket type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General Admission">
                            General Admission
                          </SelectItem>
                          <SelectItem value="VIP">VIP</SelectItem>
                          <SelectItem value="Early Bird">Early Bird</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salesStart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sales Start</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        disabled={loading}
                        value={
                          field.value
                            ? format(
                                new Date(field.value),
                                "yyyy-MM-dd'T'HH:mm",
                              )
                            : format(new Date(), "yyyy-MM-dd'T'HH:mm")
                        }
                        onChange={(e) =>
                          // Convert the input value to Date here
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salesEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sales End</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        disabled={loading}
                        value={
                          field.value
                            ? format(
                                new Date(field.value),
                                "yyyy-MM-dd'T'HH:mm",
                              )
                            : format(new Date(), "yyyy-MM-dd'T'HH:mm")
                        }
                        onChange={(e) =>
                          // Convert the input value to Date here
                          field.onChange(new Date(e.target.value))
                        }
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
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
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

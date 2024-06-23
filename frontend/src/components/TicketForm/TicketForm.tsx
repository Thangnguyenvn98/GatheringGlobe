import { useForm, useFieldArray } from "react-hook-form";
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
import { useCurrentUser } from "@/services/queries";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Define the schema using zod
const formSchema = z.object({
  tickets: z.array(
    z.object({
      price: z.number().min(0, { message: "Price must be at least zero" }),
      quantityAvailable: z
        .number()
        .min(1, { message: "At least one ticket must be available" }),
      type: z.string().min(1, { message: "Ticket type is required" }),
    }),
  ),
});

type FormData = z.infer<typeof formSchema>;

const TicketForm = () => {
  const { data: userData } = useCurrentUser();
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tickets: [{ price: 0, quantityAvailable: 1, type: "General Admission" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tickets",
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `/api/events/${eventId}/tickets`,
        data.tickets,
      );
      form.reset();
      toast.success(response.data.message);
      navigate(`/dashboard/${userData?.username}`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="max-w-4xl mx-auto p-5">
            <CardHeader className="text-center">
              <CardTitle>Create Tickets</CardTitle>
              <CardDescription>
                Fill out the form below to create new tickets.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="border p-4 rounded-lg">
                  <FormField
                    control={form.control}
                    name={`tickets.${index}.type`}
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
                    name={`tickets.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ticket Price ($)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={loading}
                            type="number"
                            placeholder="0.00"
                            onFocus={(e) => {
                              if (e.target.value === "0") e.target.value = "";
                            }}
                            onBlur={(e) => {
                              if (e.target.value === "") e.target.value = "0";
                            }}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`tickets.${index}.quantityAvailable`}
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
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 w-full mt-2"
                    >
                      Remove Ticket
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  append({
                    price: 0,
                    quantityAvailable: 1,
                    type: "General Admission",
                  })
                }
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full mt-2"
              >
                Add Another Ticket
              </Button>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-400  hover:text-black w-full"
                disabled={loading}
              >
                Create Tickets
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default TicketForm;

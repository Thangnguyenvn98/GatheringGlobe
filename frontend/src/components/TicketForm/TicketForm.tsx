import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { useCurrentEventDetail, useCurrentUser } from "@/services/queries";
import { Calendar, NotepadText, Tag, TicketPlus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { nanoid } from "nanoid";
import { cn } from "@/lib/utils";
import { createTicket } from "@/services/api";

// Define the schema using zod
const formSchema = z.object({
  tickets: z
    .array(
      z.object({
        price: z.number().min(0, { message: "Price must be at least zero" }),
        quantityAvailable: z
          .number()
          .min(1, { message: "At least one ticket must be available" }),
        type: z.string().min(1, { message: "Ticket type is required" }),
        discount: z
          .object({
            code: z.string().min(4, { message: "Discount code is required" }),
            discount: z
              .number()
              .min(1, { message: "Discount must be at least one" }),
            type: z.enum(["percentage", "number"], {
              required_error: "You need to select a discount type",
            }),
            validUntil: z
              .string()
              .refine((date) => new Date(date) >= new Date(), {
                message: "Start time must be in the future",
              }),
            usageLimit: z
              .number()
              .min(1, { message: "Usage limit must be at least one" }),
          })
          .optional(),
      }),
    )
    .refine(
      (tickets) =>
        tickets.every(
          (ticket) => !(ticket.price === 0 && ticket.discount !== undefined),
        ),
      {
        message: "Cannot apply a discount to a free ticket.",
        path: ["tickets"], // Set the path of the error
      },
    )
    .refine(
      (tickets) => {
        const types = tickets.map((ticket) => ticket.type.toLowerCase());
        return new Set(types).size === types.length;
      },
      {
        message: "Ticket types must be unique.",
        path: ["tickets"],
      },
    ),
});

export type TicketFormData = z.infer<typeof formSchema>;

const TicketForm = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { data: userData } = useCurrentUser();
  const { data: event } = useCurrentEventDetail(eventId || "");
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(1);

  const form = useForm<TicketFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tickets: [{ price: 0, quantityAvailable: 1, type: "General Admission" }],
    },
  });

  const tickets = form.watch("tickets");

  const checkTickets = () => {
    let errorMessage = "";

    // Check for invalid discounts on free tickets
    const invalidDiscount = tickets.some(
      (ticket) => ticket.price === 0 && ticket.discount !== undefined,
    );
    if (invalidDiscount) {
      errorMessage = "Cannot apply a discount to a free ticket";
    }

    // Check for duplicate ticket types
    const ticketTypes = tickets.map((ticket) => ticket.type.toLowerCase());
    const duplicates = new Set(ticketTypes).size !== ticketTypes.length;
    if (duplicates) {
      errorMessage = "*Ticket types must be unique";
    }

    // Check if discount amount exceeds the ticket price
    const invalidDiscountAmount = tickets.some((ticket) => {
      if (ticket.discount !== undefined) {
        if (
          ticket.discount.type === "number" &&
          ticket.discount.discount > ticket.price
        ) {
          errorMessage = `Discount amount cannot exceed the ticket price for ticket type: ${ticket.type}`;
          return true;
        }
        if (
          ticket.discount.type === "percentage" &&
          ticket.price * (ticket.discount.discount / 100) > ticket.price
        ) {
          errorMessage = `Discount percentage cannot exceed 100% for ticket type: ${ticket.type}`;
          return true;
        }
      }
      return false;
    });

    if (invalidDiscountAmount) {
      setErrorMessages(errorMessage);
      return;
    }

    const invalidUsageLimit = tickets.some((ticket) => {
      if (ticket.discount !== undefined) {
        if (ticket.discount.usageLimit > ticket.quantityAvailable) {
          errorMessage = `Usage limit must be less than or equal to the quantity available for ticket type: ${ticket.type}`;
          return true;
        }
      }
      return false;
    });
    if (invalidUsageLimit) {
      setErrorMessages(errorMessage);
      return;
    }

    setErrorMessages(errorMessage);
  };
  useEffect(() => {
    checkTickets();
  }, [tickets]);

  const ticketTypesArr = [
    "General Admission",
    "VIP",
    "Backstage Pass",
    "Senior",
    "Children",
  ];
  const handleAddTicket = () => {
    appendTickets({
      price: 0,
      quantityAvailable: 1,
      type: ticketTypesArr[currentIndex],
    });

    // Increment the index and wrap around if it exceeds the length of the array
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ticketTypesArr.length);
  };
  const {
    fields: ticketFields,
    append: appendTickets,
    remove: removeTickets,
  } = useFieldArray({
    control: form.control,
    name: "tickets",
  });

  const formattedStartTime = event?.startTime
    ? format(new Date(event.startTime), "LLL dd, y h:mm a")
    : "Invalid date";

  const onSubmit = async (data: TicketFormData) => {
    try {
      setLoading(true);
      const response = await createTicket(data, eventId || "");
      form.reset();
      navigate(`/dashboard/${userData?.username}`);
      toast.success(response?.message);
    } catch (error) {
      console.log(error);
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
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {event?.title}
                </h2>
                <div className="flex items-center gap-x-4">
                  <Calendar />
                  <span>{formattedStartTime}</span>
                </div>

                <img
                  src={event?.imageUrls[0]}
                  alt={event?.title}
                  className="w-80 h-80 object-cover rounded-lg mt-4"
                />
              </div>

              <CardTitle className="text-xl">Create Tickets</CardTitle>
              <CardDescription>
                Fill out the form below to create new tickets.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8  gap-y-4">
              {ticketFields.map((field, index) => (
                <div
                  key={field.id}
                  className="border p-8 rounded-lg flex flex-col gap-y-4 relative"
                >
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
                  <Button
                    type="button"
                    onClick={() => {
                      const ticket = form.getValues(`tickets.${index}`);
                      if (ticket.discount) {
                        form.setValue(`tickets.${index}.discount`, undefined);
                      } else {
                        form.setValue(`tickets.${index}.discount`, {
                          code: nanoid(6).toUpperCase(),
                          discount: 0,
                          type: "percentage",
                          validUntil: format(new Date(), "yyyy-MM-dd"),
                          usageLimit: 1,
                        });
                      }
                    }}
                    className={cn(
                      "flex items-center gap-x-2 mt-4 w-44",
                      form.getValues(`tickets.${index}.discount`)
                        ? "bg-red-500"
                        : "bg-gray-500",
                    )}
                  >
                    {form.getValues(`tickets.${index}.discount`) ? (
                      <Trash2 />
                    ) : (
                      <Tag />
                    )}
                    <span>
                      {form.getValues(`tickets.${index}.discount`)
                        ? "Remove discount"
                        : "Add discount"}
                    </span>
                  </Button>

                  {form.watch(`tickets.${index}.discount`) && (
                    <div className="gap-y-4 flex flex-col">
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.discount.code`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discount Code</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={loading}
                                placeholder="code"
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.discount.discount`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discount Amount</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={loading}
                                type="number"
                                placeholder="0.00"
                                onFocus={(e) => {
                                  if (e.target.value === "0")
                                    e.target.value = "";
                                }}
                                onBlur={(e) => {
                                  if (e.target.value === "")
                                    e.target.value = "0";
                                }}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value) || 1)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.discount.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discount Type</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex items-center gap-x-2"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="percentage" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Percentage
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="number" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Number
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.discount.validUntil`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valid Until</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={loading}
                                type="datetime-local"
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.discount.usageLimit`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Usage Limit</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={loading}
                                type="number"
                                placeholder="1"
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0,
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {ticketFields.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeTickets(index)}
                      className="bg-red-500 text-white absolute top-0 right-2 px-4 py-2 rounded hover:bg-red-700 w-12 flex items-center mt-2 gap-x-2 "
                    >
                      <Trash2 />
                    </Button>
                  )}
                </div>
              ))}
              <p className="text-red-500 font-bold">
                {errorMessages.length > 5 && errorMessages}
              </p>
              {/* Display schema-level error */}
              <Button
                type="button"
                onClick={handleAddTicket}
                className="bg-green-500 flex text-white px-4 py-2 rounded hover:bg-green-600 w-40 gap-x-2 items-center mt-2"
              >
                <TicketPlus />
                Add ticket
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                type="submit"
                className=" text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-200 w-80 flex gap-x-2"
                disabled={loading}
              >
                <NotepadText />
                CONFIRM
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default TicketForm;

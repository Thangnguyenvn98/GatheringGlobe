import FutureBackground from "../../images/ContactBackground.jpg";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Tiptap from "../tiptap";
import { Button } from "../ui/button";
import ImageUpload from "../chatRoom/ImageUpload";

const formSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(4),
  lastName: z.string().min(4),
  subject: z.string().min(4),
  description: z
    .string()
    .min(10, { message: "The description is not long enough" })
    .max(100, { message: "The description is too long" })
    .trim(),
  attachment: z
    .array(
      z.object({
        url: z.string(),
      }),
    )
    .optional(),
});

const ContactUs = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      subject: "",
      description: "",
      attachment: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="flex flex-col items-center">
      <div
        style={{
          backgroundImage: `url("${FutureBackground}")`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
        className="flex justify-center items-center min-h-[600px] w-full"
      >
        <h1 className="font-extrabold text-centers text-8xl text-white">
          SUBMIT A REQUEST
        </h1>
      </div>
      <div className="bg-gray-100 min-w-[1000px] p-4 mb-10">
        <div className="grid grid-cols-2 ">
          <div className="flex flex-col break-words max-w-[400px] p-4 gap-y-4 ">
            <h2 className="text-zinc-600 text-6xl font-semibold ">
              Tell us about your concern
            </h2>
            <p className="text-lg text-zinc-400">
              If you're experiencing issues or have questions about Gathering
              Globe, we're here to assist. Please fill out the form with your
              name, email, and a brief description of your concern. Our support
              team will promptly address your inquiry to ensure a seamless
              experience. Your feedback is invaluable in helping us improve our
              service.
            </p>
          </div>
          <div className="flex flex-col p-4 bg-white rounded-lg gap-y-4 ">
            <h2 className="font-bold text-2xl">Contact Us</h2>
            <h2>Please provide your contact information.</h2>
            <div className="flex flex-col mt-6 gap-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Tiptap
                            description={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="attachment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Attachments &#40;optional &#41;</FormLabel>
                        <FormControl>
                          <ImageUpload
                            iconClassName="text-black"
                            onChange={(url) =>
                              field.onChange([...(field.value || []), { url }])
                            }
                          />
                        </FormControl>
                        {field.value && Array.isArray(field.value) && (
                          <ul>
                            {field.value.map((item, index) => (
                              <li
                                key={index}
                                className="overflow-hidden text-ellipsis gap-x-4 flex justify-between items-center"
                              >
                                <Button className="bg-red-500" size="sm">
                                  X
                                </Button>
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {item.url}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="pt-6">
                    <Button type="submit" size="lg">
                      Submit
                    </Button>
                    {/* call the obSubmit defined above*/}
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

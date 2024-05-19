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
import { useState } from "react";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/services/queries";
import { sendUserHelpRequest } from "@/services/api";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(4),
  lastName: z.string().min(4),
  subject: z.string().min(4),
  description: z
    .string()
    .min(40, {
      message:
        "The description is not long enough, minimum 10 character required",
    })
    .max(350, { message: "The description is too long" })
    .trim(),
  attachments: z.object({ url: z.string() }).array(),
});

type FormData = z.infer<typeof formSchema>;

const ContactUs = () => {
  const { data: userData } = useCurrentUser();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: userData?.email || "",
      firstName: "",
      lastName: "",
      subject: "",
      description: "",
      attachments: [],
    },
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FormData) => {
    try {
      setLoading(true);
      const response = await sendUserHelpRequest(values);
      form.reset();
      toast.success(response.message);
      setTimeout(() => {
        navigate(0);
      }, 800);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
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
        <h1 className="font-extrabold text-8xl text-white">SUBMIT A REQUEST</h1>
      </div>
      <div className="bg-gray-100 max-w-[1000px] p-4 mb-10">
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
                    name="attachments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Attachments (optional)</FormLabel>
                        <FormControl>
                          <ImageUpload
                            disabled={loading}
                            multiple={true}
                            iconClassName="text-black"
                            value={field.value.map((image) => image.url)}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="pt-6">
                    <Button type="submit" size="lg" disabled={loading}>
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

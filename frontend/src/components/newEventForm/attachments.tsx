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
import ImageUpload from "../chatRoom/ImageUpload";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

const formSchema = z.object({
  attachments: z.object({ url: z.string() }).array(),
});

type FormData = z.infer<typeof formSchema>;

const Attachments = ({
  setImageUrlsFromParent,
}: {
  setImageUrlsFromParent: any;
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attachments: [],
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FormData) => {
    try {
      // setLoading(true);
      console.log(values);
      toast.success("Attachment uploaded successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col mt-6 gap-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="attachments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Image Attachments (optional)</FormLabel>
                  <FormControl>
                    <ImageUpload
                      disabled={loading}
                      multiple={true}
                      iconClassName="text-black"
                      value={field.value.map((image) => image.url)}
                    />
                  </FormControl>
                  <Button type="submit">Save list of attachments</Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Attachments;
